import React from 'react';
import { Button } from '@shared/components';
import { ArrowRight } from '@shared/icons';

interface RecommendedSectionHeaderProps {
  onViewAll: () => void;
}

const RecommendedSectionHeader: React.FC<RecommendedSectionHeaderProps> = ({ onViewAll }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-tb-navy">Recommended Material</h2>
      <Button variant="ghost" size="sm" onClick={onViewAll}>View All <ArrowRight className="w-3.5 h-3.5" /></Button>
    </div>
  );
};

export default RecommendedSectionHeader;
