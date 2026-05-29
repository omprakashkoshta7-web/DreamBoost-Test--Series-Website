import apiClient from '@shared/utils/apiClient';

export interface FullDashboardData {
  header: {
    name: string;
    avatar?: string;
    targetExam: string;
    planStatus: 'premium' | 'free';
    planName: string;
    planEndDate: string | null;
    notificationCount: number;
    streak: number;
  };
  continueLearning: {
    testId: string;
    testName: string;
    progress: number;
    remainingTime: number;
    category: string;
  } | null;
  preparationProgress: {
    overallPercent: number;
    dailyGoal: number;
    weeklyGoal: number;
    streak: number;
    subjectProgress: { subject: string; score: number; weakTopics: string[]; improvement: number }[];
    topicProgress: any[];
    testProgress: number;
  };
  recommended: {
    weakTopics: string[];
    todayTest: { _id: string; name: string; duration: number }[];
    suggestedMock: { _id: string; name: string; duration: number; difficulty: string }[];
    pendingRevision: { subject: string; score: number }[];
  };
  upcomingTests: {
    scheduled: any[];
    live: any[];
    upcoming: any[];
  };
  myPerformance: {
    totalTests: number;
    avgScore: number;
    accuracy: number;
    speed: number;
    rank: number;
  };
  subjectPerformance: {
    subject: string;
    score: number;
    weakTopics: string[];
    improvement: number;
  }[];
  recentActivity: {
    testId: string;
    testName: string;
    score: number;
    totalMarks: number;
    accuracy: number;
    completedAt: string;
    correctAnswers: number;
    wrongAnswers: number;
  }[];
  testLibrary: {
    mockTests: any[];
    topicTests: any[];
    pyq: any[];
    miniTests: any[];
  };
  analytics: {
    totalTimeSpent: number;
    attemptTrend: number;
    accuracyTrend: number;
  };
  rewards: {
    badges: any[];
    streak: number;
    achievements: number;
  };
  subscription: {
    isPremium: boolean;
    plan: string;
    endDate: string;
    autoRenew: boolean;
    features: string[];
  } | null;
  notifications: {
    unread: number;
    items: any[];
  };
}

export const fetchFullDashboard = async (): Promise<FullDashboardData> => {
  const response = await apiClient.get('/dashboard/full');
  return response.data.data;
};
