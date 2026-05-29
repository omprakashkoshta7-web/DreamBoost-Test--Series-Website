import React from 'react';
import { X } from 'lucide-react';

interface SubCategorySelectionModalProps {
  examName: string;
  subCategories: string[];
  onSelect: (subCategory: string) => void;
  onClose: () => void;
}

const SubCategorySelectionModal: React.FC<SubCategorySelectionModalProps> = ({ examName, subCategories, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Select Exam</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose an exam type under <span className="font-medium text-gray-900 dark:text-gray-100">{examName}</span>
          </p>
          {subCategories.map((sc, i) => (
            <button
              key={i}
              onClick={() => onSelect(sc)}
              className="w-full py-3 px-4 text-left rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
            >
              <span className="text-base font-semibold text-gray-800 dark:text-gray-200">{examName} {sc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategorySelectionModal;
