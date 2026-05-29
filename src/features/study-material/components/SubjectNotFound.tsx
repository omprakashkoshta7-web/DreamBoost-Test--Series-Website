import React from 'react';
import { Button } from '@shared/components';
import { GraduationCap } from '@shared/icons';

interface SubjectNotFoundProps {
  onBack: () => void;
}

const SubjectNotFound: React.FC<SubjectNotFoundProps> = ({ onBack }) => {
  return (
    <div className="text-center py-12">
      <GraduationCap className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-tb-navy mb-2">Subject Not Found</h2>
      <Button variant="ghost" size="sm" onClick={onBack}>Back to Study Material</Button>
    </div>
  );
};

export default SubjectNotFound;
