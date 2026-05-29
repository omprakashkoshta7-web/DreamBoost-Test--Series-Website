import React from 'react';
import { Layers } from '@shared/icons';

interface AvailableTestsHeaderProps {
  count: number;
}

const AvailableTestsHeader: React.FC<AvailableTestsHeaderProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Layers className="w-5 h-5 text-tb-blue" />
      <h2 className="text-lg font-bold text-tb-navy">Available Tests</h2>
      <span className="text-sm text-tb-gray-500 ml-auto">{count} tests</span>
    </div>
  );
};

export default AvailableTestsHeader;
