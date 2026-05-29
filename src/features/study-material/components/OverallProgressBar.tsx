import React from 'react';

interface OverallProgressBarProps {
  completionPercent: number;
}

const OverallProgressBar: React.FC<OverallProgressBarProps> = ({ completionPercent }) => {
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-tb-navy">Overall Progress</h3>
        <span className="text-sm font-bold text-tb-blue">{completionPercent}%</span>
      </div>
      <div className="w-full h-3 bg-tb-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-tb-blue to-blue-500 rounded-full transition-all duration-700"
          style={{ width: `${completionPercent}%` }}
        />
      </div>
    </div>
  );
};

export default OverallProgressBar;
