import React, { useEffect, useState } from 'react';
import { ExamSessionService } from '../../Models/ExamSession';
import { ExamSession } from '../../Models/ExamSession';
import toast from 'react-hot-toast';
import ToastCustom from "../Other/ToastCustom";
import EditModal from './EditModal'; // Import the EditModal component

const ExamScheduleTable = () => {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshKey, setRefreshKey] = useState(0);  // Refresh Key to trigger page re-fetch
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility
    const [selectedSession, setSelectedSession] = useState<ExamSession | null>(null);  // Selected session for editing

    const fetchExamSessions = async () => {
        try {
            const result = await ExamSessionService.getAllExamSessions();
            if (Array.isArray(result)) {
                setExamSessions(result);
            } else {
                console.error('Result is not an array:', result);
                toast.custom(<ToastCustom type="error" header="Error">Failed to fetch exam sessions: Invalid data format</ToastCustom>);
                setExamSessions([]);
            }
        } catch (error) {
            console.error('Error fetching exam sessions:', error);
            toast.custom(<ToastCustom type="error" header="Error">Failed to fetch exam sessions</ToastCustom>);
            setExamSessions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExamSessions();
    }, [refreshKey]); // Re-fetch when refreshKey changes

    const handleEdit = (sessionId: string) => {
        const sessionToEdit = examSessions.find(session => session.sessionId === sessionId);
        if (sessionToEdit) {
            setSelectedSession(sessionToEdit);
            setIsModalOpen(true);  // Open the modal when "Edit" is clicked
        }
    };

    const handleSave = async (updatedSession: ExamSession) => {
        setIsLoading(true);
        try {
            const result = await ExamSessionService.updateSession(updatedSession);  // Call update function
            if (result) {
                setRefreshKey(prev => prev + 1);  // Refresh the table after updating
                toast.custom(<ToastCustom type="success" header="Exam Session">Exam session updated successfully</ToastCustom>);
                setIsModalOpen(false);  // Close the modal after saving
            } else {
                toast.custom(<ToastCustom type="error" header="Exam Session">Failed to update exam session</ToastCustom>);
            }
        } catch (error) {
            console.error('Error updating exam session:', error);
            toast.custom(<ToastCustom type="error" header="Exam Session">Failed to update exam session</ToastCustom>);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (sessionId: string) => {
        if (window.confirm('Are you sure you want to delete this exam session?')) {
            setIsLoading(true);
            try {
                const result = await ExamSessionService.deleteExamSession(sessionId);  // Delete session
                if (result) {
                    setRefreshKey(prev => prev + 1);  // Refresh the table after deleting
                    toast.custom(<ToastCustom type="success" header="Success">Exam session deleted successfully</ToastCustom>);
                }
            } catch (error) {
                console.error('Error deleting exam session:', error);
                toast.custom(<ToastCustom type="error" header="Error">Failed to delete exam session</ToastCustom>);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Scheduled Exam Sessions</h2>
                <p className="mt-1 text-sm text-gray-500">View and manage all scheduled exam sessions.</p>
            </div>

            <div className="px-6 py-4">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        Loading sessions...
                                    </td>
                                </tr>
                            ) : examSessions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        No exam sessions found.
                                    </td>
                                </tr>
                            ) : (
                                examSessions.map((session) => (
                                    <tr key={session.sessionId}>
                                        <td className="px-6 py-4">{new Date(session.examDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{session.subjectCode || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span>{session.startTime} - {session.endTime}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {session.studentCount} students
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEdit(session.sessionId)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(session.sessionId)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditModal
                isOpen={isModalOpen}
                sessionData={selectedSession || {}}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default ExamScheduleTable;
