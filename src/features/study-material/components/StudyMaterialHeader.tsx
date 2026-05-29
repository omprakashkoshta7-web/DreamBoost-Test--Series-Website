import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@shared/components';
import { GraduationCap, Bookmark, TrendingUp } from '@shared/icons';

const StudyMaterialHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageHeader
      title="Study Material"
      subtitle="Comprehensive subject-wise notes, PDFs, videos and practice resources"
      icon={<GraduationCap className="w-8 h-8 text-tb-blue" />}
      action={
        <div className="flex gap-2">
          <button onClick={() => navigate('/app/my-library')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-tb-gray-200 rounded-xl text-sm font-medium text-tb-navy hover:bg-tb-gray-50 transition-all">
            <Bookmark className="w-4 h-4" /> My Library
          </button>
          <button onClick={() => navigate('/app/study-progress')} className="flex items-center gap-2 px-4 py-2.5 bg-tb-blue text-white rounded-xl text-sm font-medium hover:bg-tb-blue-dark transition-all">
            <TrendingUp className="w-4 h-4" /> My Progress
          </button>
        </div>
      }
    />
  );
};

export default StudyMaterialHeader;
