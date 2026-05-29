import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboardActions = () => {
  const navigate = useNavigate();

  const goTo = useCallback((path: string) => () => navigate(path), [navigate]);

  return {
    goToExamCategories: goTo('/app/exam-categories'),
    goToTestSeries: goTo('/app/test-series'),
    goToTest: (testId: string) => () => navigate(`/app/test-instructions/${testId}`),
    goToProfile: goTo('/app/profile'),
    goToSettings: goTo('/app/settings'),
    goToPayment: goTo('/app/payment'),
    goToNotifications: goTo('/app/notifications'),
    goToStudyMaterial: goTo('/app/study-material'),
    goToLeaderboard: goTo('/app/leaderboard'),
    goToBookmarks: goTo('/app/bookmarks'),
    goToAnalytics: goTo('/app/analytics'),
  };
};
