import { useState, useEffect } from 'react';
import { LecturerService } from '../../Models/Lecturer';
import { Faculty, FacultyService } from '../../Models/Faculty';
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom";
import { Switch } from '@headlessui/react';

const LecturerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        availability: true,
        facultyId: 0,
        rank: '',
        email: '',
        phone: '',
    });

    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFacultyLoading, setIsFacultyLoading] = useState(true);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const facs = await FacultyService.getAllFaculties()
                setFaculties(facs);
            } catch (error) {
                console.error('Error fetching faculties:', error);
                toast.custom(<ToastCustom type='error' header='Error'>Failed to load faculties</ToastCustom>);
            } finally {
                setIsFacultyLoading(false);
            }
        };

        fetchFaculties();
    }, []);

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
        if (!formData.facultyId) newErrors.facultyId = 'Faculty is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                const lecturerData = {
                    name: formData.name,
                    facultyId: formData.facultyId,
                    rank: formData.rank,
                    email: formData.email,
                    phone: formData.phone,
                    availability: formData.availability
                };

                const result = await LecturerService.addLecturer(lecturerData);

                if(result){
                    setFormData({
                        name: '',
                        availability: true,
                        facultyId: 0,
                        rank: '',
                        email: '',
                        phone: '',
                    });

                    toast.custom(<ToastCustom type='success' header='Lecturer'>Lecturer added successfully</ToastCustom>);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.custom(<ToastCustom type='error' header='Lecturer'>Failed to add lecturer</ToastCustom>);
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
                    <h2 className="text-2xl font-bold text-white">Add New Lecturer</h2>
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

                        {/* Faculty */}
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
                                disabled={isFacultyLoading}
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
                            className="px-6 py-2 border border-[var(--color-dark)] rounded-md text-[var(--color-dark)] hover:bg-[var(--color-secondary)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || isFacultyLoading}
                            className={`px-6 py-2 bg-[var(--color-primary)] rounded-md text-white hover:bg-[var(--color-light)] transition-colors ${
                                isLoading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Saving...' : 'Save Lecturer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LecturerForm;