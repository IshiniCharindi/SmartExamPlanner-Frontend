import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom";

interface EditModalProps {
    isOpen: boolean;
    lecturerData: any;
    faculties: any[];  // Changed from departments to faculties
    onClose: () => void;
    onSave: (updatedData: any) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
                                                 isOpen,
                                                 lecturerData,
                                                 faculties,  // Changed from departments to faculties
                                                 onClose,
                                                 onSave
                                             }) => {
    const [formData, setFormData] = useState<any>({
        lecturerId: null,
        name: '',
        availability: true,
        rank: '',
        email: '',
        phone: '',
        facultyId: null  // Changed from departmentId to facultyId
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (lecturerData) {
            setFormData({
                lecturerId: lecturerData.lecturerId,
                name: lecturerData.name || '',
                availability: lecturerData.availability !== false,
                rank: lecturerData.rank || '',
                email: lecturerData.email || '',
                phone: lecturerData.phone || '',
                facultyId: lecturerData.facultyId  // Changed from departmentId to facultyId
            });
        }
    }, [lecturerData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.facultyId) newErrors.facultyId = 'Faculty is required';  // Changed from departmentId to facultyId

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.custom(<ToastCustom type='warning' header='Validation'>Please correct the form errors</ToastCustom>);
            return;
        }

        setIsSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error:', error);
            toast.custom(<ToastCustom type='error' header='Lecturer'>Failed to update lecturer</ToastCustom>);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600/80 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 w-11/12 md:w-2/3 lg:w-1/2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-[var(--color-admin)] p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Edit Lecturer</h2>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${
                                        errors.name ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* Faculty (changed from Department) */}
                            <div>
                                <label htmlFor="facultyId" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Faculty <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="facultyId"
                                    name="facultyId"
                                    value={formData.facultyId || ''}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${
                                        errors.facultyId ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                                    required
                                >
                                    <option value="">Select Faculty</option>
                                    {faculties.map(faculty => (
                                        <option key={faculty.facultyId} value={faculty.facultyId}>
                                            {faculty.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.facultyId && (
                                    <p className="mt-1 text-sm text-red-500">{errors.facultyId}</p>
                                )}
                            </div>

                            {/* Rank */}
                            <div>
                                <label htmlFor="rank" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Rank
                                </label>
                                <input
                                    type="text"
                                    id="rank"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    placeholder="e.g. Professor, Associate Professor"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    placeholder="lecturer@university.edu"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    placeholder="+1234567890"
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                                    Availability
                                </label>
                                <div className="flex items-center">
                                    <span className={`mr-3 text-sm font-medium ${!formData.availability ? 'text-[var(--color-dark)]' : 'text-gray-500'}`}>
                                        Not Available
                                    </span>
                                    <Switch
                                        checked={formData.availability}
                                        onChange={(value) => setFormData(prev => ({...prev, availability: value}))}
                                        className={`${
                                            formData.availability ? 'bg-[var(--color-primary)]' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                    >
                                        <span
                                            className={`${
                                                formData.availability ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                    <span className={`ml-3 text-sm font-medium ${formData.availability ? 'text-[var(--color-dark)]' : 'text-gray-500'}`}>
                                        Available
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Toggle to set lecturer's availability status</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-[var(--color-dark)] rounded-md text-[var(--color-dark)] hover:bg-[var(--color-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`px-6 py-2 bg-[var(--color-primary)] rounded-md text-white hover:bg-[var(--color-light)] transition-colors ${
                                    isSaving ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;