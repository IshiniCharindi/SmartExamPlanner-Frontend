import {useEffect, useState} from 'react';
import { Menu, Plus, Users, UserCheck } from 'lucide-react';
import Navbar from '../Navbar/navbar';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../Other/useAuth.tsx";
import axios from "axios";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddSchedule = () => {
    navigate('/addSession'); // Adjust the route as needed
  };


  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {/* Navbar */}
      <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-[var(--color-dark)] shadow-lg">
          <div className="px-4 py-3 flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="hover:cursor-pointer text-white">
              <Menu size={24} />
            </button>
            <h1 className="ml-4 text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            
            {/* Exam Schedule Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-dark">Exam Schedules</h2>
                <button
                    className="p-2 text-[var(--color-light)] hover:bg-gold/10 rounded-full"
                    onClick={handleAddSchedule}
                >
                  <Plus size={24} />
                </button>
              </div>
              <p className="text-dark/80 mb-4">Manage examination schedules and sessions</p>
              <button
                  className="w-full bg-[var(--color-light)] text-white py-2 px-4 rounded hover:bg-gold/90 transition-colors duration-200"
                  onClick={handleAddSchedule}
              >
                Add New Schedule
              </button>
            </div>

            {/* Lecturer Data Card */}
            <div className="bg-white p-6 rounded-lg shadow-md  hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-dark">Lecturer Data</h2>
                <button className="p-2 text-[var(--color-light)] hover:bg-gold/10 rounded-full">
                  <Users size={24} />
                </button>
              </div>
              <p className="text-dark/80 mb-4">Manage lecturer information and assignments</p>
              <Link to="/lecturer">
                <button className="hover:cursor-pointer w-full bg-[var(--color-light)] text-white py-2 px-4 rounded hover:bg-gold/90 transition-colors duration-200">
                  Manage Lecturers
                </button>
              </Link>

            </div>

            {/* Supervisor Allocation Card */}
            <div className="bg-white p-6 rounded-lg shadow-md  hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-dark">Generate Final Report</h2>
                <button className="p-2 text-[var(--color-light)] hover:bg-gold/10 rounded-full">
                  <UserCheck size={24} />
                </button>
              </div>
              <p className="text-dark/80 mb-4">Assign supervisors and invigilators to sessions</p>
              <Link to="/report">
              <button className="w-full bg-[var(--color-light)] text-white py-2 px-4 rounded hover:bg-gold/90 transition-colors duration-200">
                Generate Report
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;