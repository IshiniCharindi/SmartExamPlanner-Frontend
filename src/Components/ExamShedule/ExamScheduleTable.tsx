import React, { useEffect, useState } from 'react';
import { ExamSessionService } from '../../Models/ExamSession'; // Adjust path if needed
import { ExamSession } from '../../Models/ExamSession'; // Adjust path if needed
import toast from 'react-hot-toast';
import ToastCustom from "../Other/ToastCustom";

const ExamScheduleTable = () => {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch exam sessions from the database
    const fetchExamSessions = async () => {
        try {
            const result = await ExamSessionService.getAllExamSessions();
            console.log("result",result);  // Log result to inspect the structure

            // Ensure result is an array or fallback to an empty array
            if (Array.isArray(result)) {
                setExamSessions(result);
            } else {
                console.error('Result is not an array:', result);
                toast.custom(<ToastCustom type="error" header="Error">Failed to fetch exam sessions: Invalid data format</ToastCustom>);
                setExamSessions([]);  // Set empty array in case of error
            }
        } catch (error) {
            console.error('Error fetching exam sessions:', error);
            toast.custom(<ToastCustom type="error" header="Error">Failed to fetch exam sessions</ToastCustom>);
            setExamSessions([]);  // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExamSessions();
    }, []);

    const handleEdit = (sessionId: string) => {
        console.log('Editing session with ID:', sessionId);
        // Redirect or open modal to edit the session
    };

    // const handleDelete = async (sessionId: string) => {
    //     if (window.confirm('Are you sure you want to delete this exam session?')) {
    //         setIsLoading(true);
    //         try {
    //             const result = await ExamSessionService.deleteExamSession(sessionId); // Assume this service method deletes a session
    //             if (result) {
    //                 // Remove the deleted session from the state
    //                 setExamSessions(examSessions.filter(session => session.sessionId !== sessionId));
    //                 toast.custom(<ToastCustom type="success" header="Success">Exam session deleted successfully</ToastCustom>);
    //             }
    //         } catch (error) {
    //             console.error('Error deleting exam session:', error);
    //             toast.custom(<ToastCustom type="error" header="Error">Failed to delete exam session</ToastCustom>);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    // };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[var(--color-admin)] p-6">
                    <h2 className="text-2xl font-bold text-white">Exam Schedule</h2>
                </div>

                <div className="p-6">
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="bg-[var(--color-admin)]">
                            <th className="px-4 py-2 text-white">Exam Date</th>
                            <th className="px-4 py-2 text-white">Subject Code</th>
                            <th className="px-4 py-2 text-white">Start Time</th>
                            <th className="px-4 py-2 text-white">End Time</th>
                            <th className="px-4 py-2 text-white">Student Count</th>
                            <th className="px-4 py-2 text-white">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">Loading...</td>
                            </tr>
                        ) : (
                            examSessions.map((session) => (
                                <tr key={session.sessionId}>
                                    <td className="px-4 py-2">{session.examDate}</td>
                                    <td className="px-4 py-2">{session.subjectCode}</td>
                                    <td className="px-4 py-2">{session.startTime}</td>
                                    <td className="px-4 py-2">{session.endTime}</td>
                                    <td className="px-4 py-2">{session.studentCount}</td>
                                    <td className="px-4 py-2 flex justify-around space-x-2">
                                        <button
                                            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md"
                                            // onClick={() => handleEdit(session.sessionId)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                                            // onClick={() => handleDelete(session.sessionId)}
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
    );
};

export default ExamScheduleTable;
