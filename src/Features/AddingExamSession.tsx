import { useState } from "react";
import { Menu } from 'lucide-react'; // Import Menu icon from lucide-react
import Navbar from "../Components/Navbar/navbar.tsx"; // Import Navbar
import ExamScheduleForm from "../Components/ExamShedule/ExamScheduleForm.tsx";
import ExamScheduleTable from "../Components/ExamShedule/ExamScheduleTable.tsx";

const AddingExamSession = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar visibility

    return (
        <div className="addExamSchedules bg-gray-50 min-h-screen">
            {/* Navbar */}
            <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> {/* Passing the necessary props to Navbar */}

            {/* Main Content */}
            <div className="min-h-screen">
                {/* Header */}
                <header className="bg-[var(--color-dark)] shadow-lg">
                    <div className="px-4 py-3 flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="hover:cursor-pointer text-white">
                            <Menu size={24} /> {/* This button opens the sidebar */}
                        </button>
                        <h1 className="ml-4 text-xl font-bold text-white">Add Exam Session</h1> {/* Title for the page */}
                    </div>
                </header>

                {/* Content */}
                <div className="px-6 py-4">
                    <div className="space-y-8">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h1 className="text-2xl font-semibold text-gray-800">Exam Session Management</h1>
                                <p className="mt-1 text-sm text-gray-600">Add and manage exam sessions for your institution</p>
                            </div>
                            <ExamScheduleForm /> {/* Form to add exam sessions */}
                        </div>

                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <ExamScheduleTable /> {/* Table to manage and display exam sessions */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddingExamSession;
