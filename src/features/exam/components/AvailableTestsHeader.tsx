import React from 'react';
import { Layers } from '@shared/icons';

const AvailableTestsHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Layers className="w-5 h-5 text-tb-blue" />
      <h2 className="text-lg font-bold text-tb-navy">Available Tests</h2>
    </div>
  );
};

export default AvailableTestsHeader;
