import React from 'react';
import { PageHeader } from '@shared/components';

interface SubjectDetailHeaderProps {
  name: string;
  description: string;
  materialCount: number;
  onBack: () => void;
}

const SubjectDetailHeader: React.FC<SubjectDetailHeaderProps> = ({ name, description, materialCount, onBack }) => (
  <PageHeader
    title={name}
    subtitle={`${description} \u2022 ${materialCount} materials`}
    onBack={onBack}
    backLabel="All Subjects"
  />
);

export default SubjectDetailHeader;
