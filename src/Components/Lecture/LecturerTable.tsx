import { useEffect, useState } from 'react';
import { Lecturer, LecturerService } from '../../Models/Lecturer';
import { Department, DepartmentService } from '../../Models/Department';
import { Faculty, FacultyService } from '../../Models/Faculty';
import toast from 'react-hot-toast';
import ToastCustom from "../Other/ToastCustom";
import EditModal from './EditModal.tsx';
import { Switch } from '@headlessui/react';

const LecturerTable = () => {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lects, facs] = await Promise.all([
                    LecturerService.getAllLecturers(),
                    FacultyService.getAllFaculties()
                ]);

                // Transform lecturer data to match expected structure
                const transformedLecturers = lects.map(lecturer => ({
                    ...lecturer,
                    name: lecturer.name,
                    availability: lecturer.availability === 'true'
                }));

                setLecturers(transformedLecturers);
                setFaculties(facs);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.custom(<ToastCustom type="error" header="Error">Failed to load data</ToastCustom>);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [refreshKey]);

    const handleEdit = (lecturerId: number) => {

        const lecturerToEdit = lecturers.find(l => l.lecturerId === lecturerId);
        if (lecturerToEdit) {
            setSelectedLecturer(lecturerToEdit);
            setIsModalOpen(true);
        }
    };

    const handleSave = async (updatedLecturer: Lecturer) => {
        setIsLoading(true);
        try {
            // Convert back to API expected format if needed
            const lecturerToSave = {
                ...updatedLecturer,
                lecturerName: updatedLecturer.name,
                availability: updatedLecturer.availability.toString()
            };

            const result = await LecturerService.updateLecturer(lecturerToSave);
            if (result) {
                setRefreshKey(prev => prev + 1);
                toast.custom(<ToastCustom type="success" header="Success">Lecturer updated successfully</ToastCustom>);
            }
        } catch (error) {
            console.error('Error updating lecturer:', error);
            toast.custom(<ToastCustom type="error" header="Error">Failed to update lecturer</ToastCustom>);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (lecturerId: number) => {
        if (window.confirm('Are you sure you want to delete this lecturer?')) {
            setIsLoading(true);
            try {
                const result = await LecturerService.deleteLecturer(lecturerId);
                if (result) {
                    setRefreshKey(prev => prev + 1);
                    toast.custom(<ToastCustom type="success" header="Success">Lecturer deleted successfully</ToastCustom>);
                }
            } catch (error) {
                console.error('Error deleting lecturer:', error);
                toast.custom(<ToastCustom type="error" header="Error">Failed to delete lecturer</ToastCustom>);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleAvailability = async (lecturerId: number) => {
        setIsLoading(true);
        try {
            const lecturer = lecturers.find(l => l.lecturerId === lecturerId);
            if (!lecturer) return;

            const updatedAvailability = !lecturer.availability;

            const result = await LecturerService.updateLecturerAvailability(
                lecturerId,
                updatedAvailability// convert back to string if API expects it
            );

            if (result) {
                setRefreshKey(prev => prev + 1);
                toast.custom(<ToastCustom type="success" header="Success">Availability updated</ToastCustom>);
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            toast.custom(<ToastCustom type="error" header="Error">Failed to update availability</ToastCustom>);
        } finally {
            setIsLoading(false);
        }
    };



    const getFacultyName = (facultyId: number) => {
        const fac = faculties.find(f => f.facultyId === facultyId);
        return fac ? fac.name : 'Unknown';
    };

    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Lecturers</h2>
                <p className="mt-1 text-sm text-gray-500">View and manage all lecturers.</p>
            </div>

            <div className="px-6 py-4">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        Loading lecturers...
                                    </td>
                                </tr>
                            ) : lecturers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        No lecturers found.
                                    </td>
                                </tr>
                            ) : (
                                lecturers.map((lecturer) => (

                                    <tr key={lecturer.lecturerId}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{lecturer.name}</div>
                                            <div className="text-sm text-gray-500">{lecturer.email}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getFacultyName(lecturer.facultyId)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {lecturer.rank && <div className="text-sm text-gray-500">{lecturer.rank}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span className={`mr-3 text-sm font-medium ${!lecturer.availability ? 'text-[var(--color-dark)]' : 'text-gray-500'}`}>
                                                    Not Available
                                                </span>
                                                <Switch
                                                    checked ={lecturer.availability}
                                                    onChange={() => toggleAvailability(lecturer.lecturerId!)}
                                                    className={`${
                                                        lecturer.availability ? 'bg-[var(--color-primary)]' : 'bg-gray-200'
                                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span
                                                        className={`${
                                                            lecturer.availability ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                    />
                                                </Switch>
                                                <span className={`ml-3 text-sm font-medium ${lecturer.availability ? 'text-[var(--color-dark)]' : 'text-gray-500'}`}>
                                                    Available
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => handleEdit(lecturer.lecturerId!)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lecturer.lecturerId!)}
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
                lecturerData={selectedLecturer}
                faculties={faculties}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default LecturerTable;