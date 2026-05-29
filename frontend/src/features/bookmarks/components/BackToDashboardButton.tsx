import React from 'react';
import { ArrowLeft } from '@shared/icons';
import { useNavigate } from 'react-router-dom';

const BackToDashboardButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/app/dashboard')} className="flex items-center gap-2 text-tb-gray-500 hover:text-tb-navy">
      <ArrowLeft className="w-4 h-4" /><span className="text-sm font-medium">Back to Dashboard</span>
    </button>
  );
};

export default BackToDashboardButton;
