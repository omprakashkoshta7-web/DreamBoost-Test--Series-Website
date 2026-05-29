import React from 'react';
import { EmptyState, Button } from '@shared/components';
import { BookOpen } from '@shared/icons';

interface MyTestsEmptyStateProps {
  onBrowseSeries: () => void;
}

const MyTestsEmptyState: React.FC<MyTestsEmptyStateProps> = ({ onBrowseSeries }) => (
  <EmptyState
    icon={<BookOpen className="w-12 h-12 text-tb-gray-300" />}
    title="No tests enrolled yet"
    description="Enroll in a test to start your preparation."
    action={<Button onClick={onBrowseSeries}>Enroll Now</Button>}
  />
);

export default MyTestsEmptyState;
