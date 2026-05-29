import React from 'react';
import { PageHeader } from '@shared/components';

interface MyTestsHeaderProps {
  onBack: () => void;
  testCount: number;
}

const MyTestsHeader: React.FC<MyTestsHeaderProps> = ({ onBack, testCount }) => (
  <PageHeader
    title="My Tests"
    subtitle={`${testCount} test${testCount !== 1 ? 's' : ''} enrolled`}
    onBack={onBack}
  />
);

export default MyTestsHeader;
