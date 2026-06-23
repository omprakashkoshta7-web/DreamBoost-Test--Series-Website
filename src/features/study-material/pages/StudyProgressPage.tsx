import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, PageHeader } from '@shared/components';
import ProgressStatsGrid from '@features/study-material/components/ProgressStatsGrid';
import OverallProgressBar from '@features/study-material/components/OverallProgressBar';
import WeakSubjectsList from '@features/study-material/components/WeakSubjectsList';
import RecentActivityList from '@features/study-material/components/RecentActivityList';
import ProgressEmptyState from '@features/study-material/components/ProgressEmptyState';
import { TrendingUp } from '@shared/icons';
import { useStudyProgress } from '../hooks/useStudyMaterial';
import SEO from '@shared/components/SEO';

const StudyProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, progress } = useStudyProgress();

  if (loading || !progress) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <SEO title="Study Progress" noIndex />
      <PageHeader
        title="My Study Progress"
        subtitle="Track your learning journey and improve weak areas"
        icon={<TrendingUp className="w-7 h-7 text-tb-blue" />}
      />

      <ProgressStatsGrid
        totalStudyHours={progress.totalStudyHours}
        completionPercent={progress.completionPercent}
        completedCount={progress.completedCount}
        totalMaterials={progress.totalMaterials}
        totalChapters={progress.totalChapters}
      />

      <OverallProgressBar completionPercent={progress.completionPercent} />

      <WeakSubjectsList subjects={progress.weakSubjects} />

      <RecentActivityList activities={progress.recentActivity} />

      {progress.completedCount === 0 && progress.weakSubjects.length === 0 && progress.recentActivity.length === 0 && (
        <ProgressEmptyState onStartStudying={() => navigate('/app/study-material')} />
      )}
    </div>
  );
};

export default StudyProgressPage;
