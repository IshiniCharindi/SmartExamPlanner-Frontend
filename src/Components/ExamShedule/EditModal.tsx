import React, { useState, useEffect } from 'react';
import { ExamSessionService } from "../../Models/ExamSession";
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom";

interface EditModalProps {
    isOpen: boolean;
    sessionData: any;
    onClose: () => void;
    onSave: (updatedSession: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, sessionData, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        sessionId: '', // Add sessionId to form data
        examDate: '',
        startTime: '',
        endTime: '',
        subjectCode: '',
        studentCount: 0
    });
    const [isLoading, setIsLoading] = useState(false); // To handle loading state

    // Initialize formData when sessionData changes (if the modal is opened with new session data)
    useEffect(() => {
        if (sessionData) {
            setFormData({
                sessionId: sessionData.sessionId || '',
                examDate: sessionData.examDate || '',
                startTime: sessionData.startTime || '',
                endTime: sessionData.endTime || '',
                subjectCode: sessionData.subjectCode || '',
                studentCount: sessionData.studentCount || 0
            });
        }
    }, [sessionData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);  // Start loading
            console.log("send Data", formData);

            // Make sure this returns true if successful
            const result = await ExamSessionService.updateSession(formData);
            console.log("update result",result)
            if (result) {
                toast.custom(<ToastCustom type='success' header='Exam Session'>Exam session updated successfully</ToastCustom>);
                onSave(formData);  // Trigger the onSave function passed from the parent
                onClose();  // Close the modal after saving
            } else {
                toast.custom(<ToastCustom type='error' header='Exam Session'>Failed to update exam session</ToastCustom>);
            }
        } catch (error) {
            console.error('Error updating exam session:', error);
            toast.custom(<ToastCustom type='error' header='Exam Session'>Failed to update exam session</ToastCustom>);
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };


    if (!isOpen) return null;  // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-medium mb-4">Edit Exam Session</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Session ID Field (read-only) */}
                        <div>
                            <label htmlFor="sessionId" className="block text-sm font-medium text-gray-700">Session ID</label>
                            <input
                                type="text"
                                id="sessionId"
                                name="sessionId"
                                value={formData.sessionId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                disabled // Disable the field to make it non-editable
                            />
                        </div>
                        {/* Exam Date Field */}
                        <div>
                            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">Exam Date</label>
                            <input
                                type="date"
                                id="examDate"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* Subject Code Field */}
                        <div>
                            <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700">Subject Code</label>
                            <input
                                type="text"
                                id="subjectCode"
                                name="subjectCode"
                                value={formData.subjectCode || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {/* Start Time Field */}
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* End Time Field */}
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* Student Count Field */}
                        <div>
                            <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700">Number of Students</label>
                            <input
                                type="number"
                                id="studentCount"
                                name="studentCount"
                                value={formData.studentCount}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
