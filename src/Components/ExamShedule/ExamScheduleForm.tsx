import React, { useState } from 'react';
import {ExamSession, ExamSessionService} from '../../Models/ExamSession'; // Adjust the path based on your project structure
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom";
import {UserServices} from "../../Models/Users.tsx";

const ExamScheduleForm = () => {
    const [formData, setFormData] = useState<Omit<ExamSession, 'sessionId'>>({
        examDate: '',
        startTime: '',
        endTime: '',
        subjectCode: '',
        studentCount: 0
    });

    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'studentCount' ? parseInt(value) || 0 : value
        }));

        if (errors[name as keyof typeof formData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<typeof formData> = {};

        if (!formData.examDate) newErrors.examDate = 'Exam date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (formData.studentCount <= 0) newErrors.studentCount = 'Student count must be positive';

        // Validate time sequence
        if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
            newErrors.endTime = 'End time must be after start time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Form submitted:', formData);
                const result = await ExamSessionService.addExamSession(formData);
                // console.log("Result",result)
                if(result){
                    setFormData({
                        examDate: '',
                        startTime: '',
                        endTime: '',
                        subjectCode: '',
                        studentCount: 0
                    });

                    toast.custom(<ToastCustom type='success' header='Exam Session'>Exam session created successfully</ToastCustom>);
                }

            } catch (error) {
                console.error('Error:', error);
                toast.custom(<ToastCustom type='error' header='Exam Session'>Failed to create exam session</ToastCustom>);
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.custom(<ToastCustom type='warning' header='Validation'>Please correct the form errors</ToastCustom>);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[var(--color-admin)] p-6">
                    <h2 className="text-2xl font-bold text-white">Add New Exam Session</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Exam Date */}
                        <div>
                            <label htmlFor="examDate" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                Exam Date
                            </label>
                            <input
                                type="date"
                                id="examDate"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${
                                    errors.examDate ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                required
                            />
                            {errors.examDate && (
                                <p className="mt-1 text-sm text-red-500">{errors.examDate}</p>
                            )}
                        </div>

                        {/* Subject Code */}
                        <div>
                            <label htmlFor="subjectCode" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                Subject Code (optional)
                            </label>
                            <input
                                type="text"
                                id="subjectCode"
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                placeholder="e.g. MATH101"
                            />
                        </div>

                        {/* Start Time */}
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                Start Time
                            </label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${
                                    errors.startTime ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                required
                            />
                            {errors.startTime && (
                                <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>
                            )}
                        </div>

                        {/* End Time */}
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                End Time
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${
                                    errors.endTime ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                required
                            />
                            {errors.endTime && (
                                <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
                            )}
                        </div>

                        {/* Student Count */}
                        <div>
                            <label htmlFor="studentCount" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                Number of Students
                            </label>
                            <input
                                type="number"
                                id="studentCount"
                                name="studentCount"
                                value={formData.studentCount || ''}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-4 py-2 border ${
                                    errors.studentCount ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                required
                            />
                            {errors.studentCount && (
                                <p className="mt-1 text-sm text-red-500">{errors.studentCount}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-[var(--color-dark)] rounded-md text-[var(--color-dark)] hover:bg-[var(--color-secondary)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-2 bg-[var(--color-primary)] rounded-md text-white hover:bg-[var(--color-light)] transition-colors ${
                                isLoading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Saving...' : 'Save Exam Session'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExamScheduleForm;