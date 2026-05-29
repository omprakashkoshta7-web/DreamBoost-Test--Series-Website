import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '@shared/components';
import SubjectNotFound from '@features/study-material/components/SubjectNotFound';
import SubjectDetailHeader from '@features/study-material/components/SubjectDetailHeader';
import ChapterCard from '@features/study-material/components/ChapterCard';
import MaterialItemCard from '@features/study-material/components/MaterialItemCard';
import MaterialsEmptyState from '@features/study-material/components/MaterialsEmptyState';
import SectionHeader from '@features/study-material/components/SectionHeader';
import { useSubjectDetail } from '../hooks/useStudyMaterial';

const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { chapters, loading, materials, subject } = useSubjectDetail(subjectId);

  if (loading && materials.length === 0) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  if (!subject) {
    return <SubjectNotFound onBack={() => navigate('/app/study-material')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SubjectDetailHeader name={subject.name} description={subject.description} materialCount={subject.materialCount} onBack={() => navigate('/app/study-material')} />

      {chapters.length > 0 && (
        <div>
          <SectionHeader title="Chapters" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map((ch) => (
              <ChapterCard key={ch.id} chapter={ch} subjectId={subjectId!} />
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionHeader title="All Materials" />
        {materials.length === 0 ? (
          <MaterialsEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <MaterialItemCard key={m.id} material={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetailPage;
