import React from 'react';
import { EmptyState } from '@shared/components';
import { GraduationCap } from '@shared/icons';

const MaterialEmptyState: React.FC = () => (
  <EmptyState icon={<GraduationCap className="w-12 h-12 text-tb-gray-300" />} title="No materials found" />
);

export default MaterialEmptyState;
