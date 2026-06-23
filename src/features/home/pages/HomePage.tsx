import React, { useEffect } from 'react';
import SEO from '@shared/components/SEO';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@shared/components';
import {
  ContinueTestSection,
  ExamCardsSection,
  FreeTestsIcon,
  PremiumPlansSection,
  QuickActionButtons,
  RecommendedExamsIcon,
  TopCategoriesSection,
  WelcomeBanner,
} from '../components/HomePageSections';
import { useHome } from '../hooks';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { content, loading, refresh } = useHome();

  const openExamFullscreen = (id: string) => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    navigate(`/app/test-exam/${id}`);
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" label="Loading home..." />
      </div>
    );
  }

  const recommendedExams = content?.recommendedExams || content?.freeTests || [];

  return (
    <div className="space-y-8 pb-8">
      <SEO title="Home" noIndex />
      <WelcomeBanner homeData={content} />
      <QuickActionButtons onNavigate={navigate} />
      <TopCategoriesSection categories={content?.categories} onNavigate={navigate} />
      <ContinueTestSection tests={content?.continueTests} onNavigate={navigate} onResume={openExamFullscreen} />
      <ExamCardsSection
        title="Recommended Exams"
        icon={<RecommendedExamsIcon />}
        tests={recommendedExams.slice(0, 8)}
        onNavigate={navigate}
      />
      <ExamCardsSection
        title="Free Tests"
        icon={<FreeTestsIcon />}
        tests={content?.freeTests?.slice(0, 4)}
        actionLabel="Start Free"
        actionColor="text-tb-green"
        showViewAll
        onNavigate={navigate}
      />
      <PremiumPlansSection plans={content?.plans} onNavigate={navigate} />
    </div>
  );
};

export default HomePage;
