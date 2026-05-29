import React from 'react';
import { EmptyState } from '@shared/components';
import { Search } from '@shared/icons';

interface CategoryEmptyStateProps {
  query: string;
}

const CategoryEmptyState: React.FC<CategoryEmptyStateProps> = ({ query }) => (
  <EmptyState icon={<Search className="w-12 h-12 text-tb-gray-300" />} title="No categories found" description="Try a different search term." />
);

export default CategoryEmptyState;
