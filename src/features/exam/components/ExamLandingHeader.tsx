import React from 'react';
import { PageHeader } from '@shared/components';

interface ExamLandingHeaderProps {
  name: string;
  description?: string;
  onBack: () => void;
}

const ExamLandingHeader: React.FC<ExamLandingHeaderProps> = ({ name, description, onBack }) => (
  <PageHeader title={name} subtitle={description} onBack={onBack} />
);

export default ExamLandingHeader;
