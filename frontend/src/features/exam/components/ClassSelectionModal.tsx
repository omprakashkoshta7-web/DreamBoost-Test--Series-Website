import React from 'react';
import { X } from 'lucide-react';

interface ClassSelectionModalProps {
  examName: string;
  onSelect: (className: '11' | '12') => void;
  onClose: () => void;
}

const ClassSelectionModal: React.FC<ClassSelectionModalProps> = ({ examName, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Select Class</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose your class for <span className="font-medium text-gray-900 dark:text-gray-100">{examName}</span>
          </p>
          <button
            onClick={() => onSelect('11')}
            className="w-full py-3 px-4 text-left rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all group"
          >
            <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Class 11</span>
            <p className="text-sm text-blue-500 dark:text-blue-400 mt-0.5">Physics, Chemistry, Mathematics (Class 11)</p>
          </button>
          <button
            onClick={() => onSelect('12')}
            className="w-full py-3 px-4 text-left rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all group"
          >
            <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">Class 12</span>
            <p className="text-sm text-purple-500 dark:text-purple-400 mt-0.5">Physics, Chemistry, Mathematics (Class 12)</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassSelectionModal;
