import React, { useState, useEffect } from 'react';
import { ExamSession, ExamSessionService } from '../../Models/ExamSession';
import { Department, DepartmentService } from '../../Models/Department';
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom";

const ExamScheduleForm = () => {
    const [formData, setFormData] = useState<Omit<ExamSession, 'sessionId'>>({
        examDate: '',
        startTime: '',
        endTime: '',
        subjectCode: '',
        studentCount: 0,
        departmentId: 0
    });

    const [departments, setDepartments] = useState<Department[]>([]);
    const [isDeptLoading, setIsDeptLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const depts = await DepartmentService.getAllDepartments();
                console.log("depts",depts)
                setDepartments(depts);
            } catch (error) {
                console.error('Error fetching departments:', error);
                toast.custom(<ToastCustom type='error' header='Error'>Failed to load departments</ToastCustom>);
            } finally {
                setIsDeptLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'studentCount' || name === 'degreeId'
                ? Number(value)  // Use Number instead of parseInt
                : value
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
        if (!formData.departmentId || formData.departmentId === 0) newErrors.departmentId = 'Department is required';

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
                await new Promise(resolve => setTimeout(resolve, 1500));
                const result = await ExamSessionService.addExamSession(formData);
                console.log(result)
                if(result){
                    setFormData({
                        examDate: '',
                        startTime: '',
                        endTime: '',
                        subjectCode: '',
                        studentCount: 0,
                        departmentId: 0
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
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">Schedule New Exam Session</h2>
                <p className="mt-1 text-sm text-gray-500">Fill in the details below to create a new exam session.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    {/* Exam Date */}
                    <div>
                        <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">
                            Exam Date <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="date"
                                id="examDate"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                className={`block w-full rounded-md shadow-sm ${
                                    errors.examDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } sm:text-sm`}
                                required
                            />
                            {errors.examDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.examDate}</p>
                            )}
                        </div>
                    </div>

                    {/* Department Dropdown (used for degreeId) */}
                    <div>
                        <label htmlFor="degreeId" className="block text-sm font-medium text-gray-700">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <select
                                id="departmentId"
                                name="departmentId"
                                value={formData.departmentId || ''}
                                onChange={handleChange}
                                className={`block w-full rounded-md shadow-sm ${
                                    errors.departmentId ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } sm:text-sm`}
                                required
                                disabled={isDeptLoading}
                            >
                                <option value="">Select Degree</option>
                                {departments.map(dept => (
                                    <option key={dept.departmentId} value={dept.departmentId}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                                <p className="mt-1 text-sm text-red-600">{errors.departmentId}</p>
                            )}
                        </div>
                    </div>

                    {/* Subject Code */}
                    <div>
                        <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700">
                            Subject Code
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="subjectCode"
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                maxLength={10}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="e.g. MATH101"
                            />
                        </div>
                    </div>

                    {/* Start Time */}
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className={`block w-full rounded-md shadow-sm ${
                                    errors.startTime ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } sm:text-sm`}
                                required
                            />
                            {errors.startTime && (
                                <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
                            )}
                        </div>
                    </div>

                    {/* End Time */}
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                            End Time <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className={`block w-full rounded-md shadow-sm ${
                                    errors.endTime ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } sm:text-sm`}
                                required
                            />
                            {errors.endTime && (
                                <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                            )}
                        </div>
                    </div>

                    {/* Student Count */}
                    <div>
                        <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700">
                            Number of Students <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                id="studentCount"
                                name="studentCount"
                                value={formData.studentCount || ''}
                                onChange={handleChange}
                                min="1"
                                className={`block w-full rounded-md shadow-sm ${
                                    errors.studentCount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } sm:text-sm`}
                                required
                            />
                            {errors.studentCount && (
                                <p className="mt-1 text-sm text-red-600">{errors.studentCount}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || isDeptLoading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#edb83d] hover:bg-[#d9a637] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#edb83d] ${
                            isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : 'Save Exam Session'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExamScheduleForm;