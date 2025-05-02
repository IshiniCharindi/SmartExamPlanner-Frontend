import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menu, Plus, Users, UserCheck } from 'lucide-react';
import Navbar from '../Navbar/navbar';
import DashboardCard from '../Dashboard/dashCard';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {/* Sidebar Navbar */}
      <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-[var(--color-dark)] shadow-lg">
          <div className="px-4 py-3 flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="text-white">
              <Menu size={24} />
            </button>
            <h1 className="ml-4 text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard
              title="Exam Schedules"
              description="Manage examination schedules and sessions"
              buttonText="Add New Schedule"
              icon={Plus}
              onClick={() => console.log('Schedule clicked')}
            />
            <DashboardCard
              title="Lecturer Data"
              description="Manage lecturer information and assignments"
              buttonText="Manage Lecturers"
              icon={Users}
              onClick={() => navigate('/addlecturer')}
            />
            <DashboardCard
              title="Supervisor Allocation"
              description="Assign supervisors and invigilators to sessions"
              buttonText="Allocate Staff"
              icon={UserCheck}
              onClick={() => console.log('Allocation clicked')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
