import React, { useEffect, useState } from 'react';
import { ExamSessionService } from '../../Models/ExamSession';
import { ExamSession } from '../../Models/ExamSession';
import toast from 'react-hot-toast';
import ToastCustom from "../Other/ToastCustom";

const ExamScheduleTable = () => {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshKey, setRefreshKey] = useState(0);

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
    }, [refreshKey]);

    const handleEdit = (sessionId: string) => {
        console.log('Editing session with ID:', sessionId);
    };

    const handleDelete = async (sessionId: string) => {
        if (window.confirm('Are you sure you want to delete this exam session?')) {
            setIsLoading(true);
            try {
                const result = await ExamSessionService.deleteExamSession(sessionId);
                if (result) {
                    setRefreshKey(prev => prev + 1);
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Exam Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject Code
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Students
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        <div className="flex justify-center items-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading sessions...
                                        </div>
                                    </td>
                                </tr>
                            ) : examSessions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        No exam sessions found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                examSessions.map((session) => (
                                    <tr key={session.sessionId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {new Date(session.examDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {session.subjectCode || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span className="font-medium">{session.startTime}</span>
                                                <span className="mx-1">-</span>
                                                <span className="font-medium">{session.endTime}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {session.studentCount} students
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
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
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamScheduleTable;