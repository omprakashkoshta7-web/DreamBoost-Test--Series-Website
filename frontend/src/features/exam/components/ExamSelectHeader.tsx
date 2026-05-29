import React from 'react';
import { PageHeader } from '@shared/components';

interface ExamSelectHeaderProps {
  name: string;
  description?: string;
  onBack: () => void;
}

const ExamSelectHeader: React.FC<ExamSelectHeaderProps> = ({ name, description, onBack }) => (
  <PageHeader title={name} subtitle={description} onBack={onBack} backLabel="Back to Categories" />
);

export default ExamSelectHeader;
