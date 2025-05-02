import React from 'react';
import { Link } from 'react-router-dom';
import { X, LayoutDashboard, Calendar, LogOut } from 'lucide-react';
import useLogout from "../../hooks/UseLogout.tsx";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navbar = ({ isOpen, onClose }: NavbarProps) => {
  const logout = useLogout();
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-dark)] transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-30`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="hover:cursor-pointer text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        <Link to="/admin" className="flex items-center px-6 py-3 text-white hover:bg-gold/20">
          <LayoutDashboard className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link to="/timetable" className="flex items-center px-6 py-3 text-white hover:bg-gold/20">
          <Calendar className="mr-3" size={20} />
          Time Table
        </Link>
        <Link to="/" className=" flex items-center px-6 py-3 text-white hover:bg-gold/20">
          <LogOut className="mr-3" size={20} />
          <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;