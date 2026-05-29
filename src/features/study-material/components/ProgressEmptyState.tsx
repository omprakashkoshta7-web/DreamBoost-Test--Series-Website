import React from 'react';
import { TrendingUp } from '@shared/icons';

interface ProgressEmptyStateProps {
  onStartStudying: () => void;
}

const ProgressEmptyState: React.FC<ProgressEmptyStateProps> = ({ onStartStudying }) => {
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-12 text-center">
      <TrendingUp className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-tb-navy mb-1">No study data yet</h3>
      <p className="text-sm text-tb-gray-500 mb-4">Start studying to see your progress here</p>
      <button
        onClick={onStartStudying}
        className="px-6 py-2.5 bg-tb-blue text-white rounded-xl text-sm font-medium hover:bg-tb-blue-dark transition-all"
      >
        Start Studying
      </button>
    </div>
  );
};

export default ProgressEmptyState;
