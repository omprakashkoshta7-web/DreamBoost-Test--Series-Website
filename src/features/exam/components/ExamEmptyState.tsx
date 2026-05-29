import React from 'react';
import { BookOpen } from '@shared/icons';

interface ExamEmptyStateProps {
  categoryName: string;
}

const ExamEmptyState: React.FC<ExamEmptyStateProps> = ({ categoryName }) => {
  return (
    <div className="text-center py-20">
      <BookOpen className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-tb-navy mb-2">No exams available</h3>
      <p className="text-tb-gray-500">Check back later for new exams in this category.</p>
    </div>
  );
};

export default ExamEmptyState;
