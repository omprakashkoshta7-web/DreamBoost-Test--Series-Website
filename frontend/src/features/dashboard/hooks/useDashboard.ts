import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectDashboardStats, selectDashboardLoading, selectDashboardError } from '../store/dashboard.selectors';
import { fetchDashboardStats } from '../store/dashboard.thunks';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const loading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);

  return { stats, loading, error, dispatch };
};

export const useDashboardData = () => {
  const { stats } = useDashboard();
  return useMemo(() => ({
    header: stats?.header,
    continueLearning: stats?.continueLearning,
    preparationProgress: stats?.preparationProgress,
    recommended: stats?.recommended,
    upcomingTests: stats?.upcomingTests,
    myPerformance: stats?.myPerformance,
    subjectPerformance: stats?.subjectPerformance || [],
    recentActivity: stats?.recentActivity || [],
    testLibrary: stats?.testLibrary,
    analytics: stats?.analytics,
    rewards: stats?.rewards,
    subscription: stats?.subscription,
    notifications: stats?.notifications,
  }), [stats]);
};
