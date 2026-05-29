import React from 'react';
import { PageHeader } from '@shared/components';
import { GraduationCap } from '@shared/icons';

const ExamCategoryHeader: React.FC = () => (
  <PageHeader
    title="Exam Categories"
    subtitle="Choose your exam category to start preparing"
    icon={<GraduationCap className="w-8 h-8 text-tb-blue" />}
  />
);

export default ExamCategoryHeader;
