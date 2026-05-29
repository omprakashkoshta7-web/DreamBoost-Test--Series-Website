import React from 'react';
import { EmptyState } from '@shared/components';
import { Search } from '@shared/icons';

const TestEmptyState: React.FC = () => (
  <EmptyState icon={<div className="w-16 h-16 rounded-2xl bg-tb-gray-50 flex items-center justify-center mx-auto"><Search className="w-7 h-7 text-tb-gray-400" /></div>} title="No tests found" />
);

export default TestEmptyState;
