import React from 'react';
import { GraduationCap } from '@shared/icons';

const MaterialsEmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-12 text-center">
      <GraduationCap className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
      <p className="text-tb-gray-500 text-sm">No materials available for this subject yet.</p>
    </div>
  );
};

export default MaterialsEmptyState;
