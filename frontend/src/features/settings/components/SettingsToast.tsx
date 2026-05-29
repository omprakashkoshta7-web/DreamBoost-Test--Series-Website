import React from 'react';
import { CheckCircle, XCircle } from '@shared/icons';

interface SettingsToastProps {
  message: { type: string; text: string } | null;
}

const SettingsToast: React.FC<SettingsToastProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white text-sm flex items-center gap-2 z-50 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      {message.text}
    </div>
  );
};

export default SettingsToast;
