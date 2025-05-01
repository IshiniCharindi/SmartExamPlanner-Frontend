import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-dark">{title}</h2>
        <button className="p-2 text-[var(--color-light)] hover:bg-gold/10 rounded-full">
          <Icon size={24} />
        </button>
      </div>
      <p className="text-dark/80 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="w-full bg-[var(--color-light)] text-white py-2 px-4 rounded hover:bg-gold/90 transition-colors duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;
