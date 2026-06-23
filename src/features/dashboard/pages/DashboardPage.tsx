import React, { useEffect } from 'react';
import SEO from '@shared/components/SEO';
import { useDashboard, useDashboardActions } from '../hooks';
import { fetchDashboardStats } from '../store/dashboard.thunks';
import DashboardSkeleton from '../components/DashboardSkeleton';
import DashboardHeader from '../components/DashboardHeader';
import ContinueLearning from '../components/ContinueLearning';
import QuickActions from '../components/QuickActions';
import PreparationProgress from '../components/PreparationProgress';
import RecommendedForYou from '../components/RecommendedForYou';
import UpcomingTests from '../components/UpcomingTests';
import MyPerformance from '../components/MyPerformance';
import SubjectPerformance from '../components/SubjectPerformance';
import RecentActivity from '../components/RecentActivity';
import TestLibrary from '../components/TestLibrary';
import AnalyticsSnapshot from '../components/AnalyticsSnapshot';
import RewardsSection from '../components/RewardsSection';
import SubscriptionCard from '../components/SubscriptionCard';
import NotificationsPanel from '../components/NotificationsPanel';
import QuickLinksCard from '@features/dashboard/components/QuickLinksCard';

const DashboardPage: React.FC = () => {
  const { stats, loading, dispatch } = useDashboard();
  const actions = useDashboardActions();

  useEffect(() => { dispatch(fetchDashboardStats()); }, []);

  if (loading || !stats) return <DashboardSkeleton />;

  const { header, continueLearning, preparationProgress, recommended, upcomingTests, myPerformance, subjectPerformance, recentActivity, testLibrary, analytics, rewards, subscription, notifications } = stats;

  return (
    <div className="space-y-5 sm:space-y-6">
      <SEO title="Dashboard" noIndex />
      {/* 1. Header */}
      <DashboardHeader
        name={header.name} avatar={header.avatar} targetExam={header.targetExam}
        planName={header.planName} planStatus={header.planStatus} notificationCount={header.notificationCount}
        onExamChange={actions.goToSettings}
        onSettings={actions.goToSettings}
        onProfile={actions.goToProfile}
        onNotifications={actions.goToNotifications}
      />

      {/* 2. Continue Learning */}
      {continueLearning && (
        <ContinueLearning
          testId={continueLearning.testId} testName={continueLearning.testName}
          progress={continueLearning.progress} remainingTime={continueLearning.remainingTime}
          category={continueLearning.category}
          onResume={actions.goToTest(continueLearning.testId)}
        />
      )}

      {/* 3. Quick Actions */}
      <QuickActions
        onStartMock={actions.goToTestSeries}
        onPractice={actions.goToTestSeries}
        onPYQ={actions.goToTestSeries}
        onRevision={actions.goToStudyMaterial}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* 4. Preparation Progress */}
          <PreparationProgress
            overallPercent={preparationProgress.overallPercent}
            dailyGoal={preparationProgress.dailyGoal}
            weeklyGoal={preparationProgress.weeklyGoal}
            streak={preparationProgress.streak}
            subjectProgress={preparationProgress.subjectProgress}
            testProgress={preparationProgress.testProgress}
          />

          {/* 5. Recommended */}
          <RecommendedForYou
            weakTopics={recommended.weakTopics}
            todayTest={recommended.todayTest}
            suggestedMock={recommended.suggestedMock}
            pendingRevision={recommended.pendingRevision}
            onStartTest={(id) => actions.goToTest(id)()}
            onPracticeTopic={actions.goToStudyMaterial}
            onStartMock={(id) => actions.goToTest(id)()}
            onRevision={actions.goToStudyMaterial}
          />

          {/* 6. Upcoming Tests */}
          <UpcomingTests
            scheduled={upcomingTests.scheduled}
            live={upcomingTests.live}
            onStartTest={(id) => actions.goToTest(id)()}
          />

          {/* 7. My Performance */}
          <MyPerformance
            totalTests={myPerformance.totalTests}
            avgScore={myPerformance.avgScore}
            accuracy={myPerformance.accuracy}
            speed={myPerformance.speed}
            rank={myPerformance.rank}
          />

          {/* 8. Subject Performance */}
          <SubjectPerformance subjects={subjectPerformance} />

          {/* 9. Recent Activity */}
          <RecentActivity
            activities={recentActivity}
            onViewResult={(i) => {
              const act = recentActivity[i];
              if (act?.testId) actions.goToTest(act.testId)();
            }}
          />

          {/* 10. Test Library */}
          <TestLibrary
            mockTests={testLibrary.mockTests}
            topicTests={testLibrary.topicTests}
            pyq={testLibrary.pyq}
            miniTests={testLibrary.miniTests}
          />

          {/* 11. Analytics */}
          <AnalyticsSnapshot
            totalTimeSpent={analytics.totalTimeSpent}
            attemptTrend={analytics.attemptTrend}
            accuracyTrend={analytics.accuracyTrend}
            onViewDetailed={actions.goToLeaderboard}
          />

          {/* 12. Rewards */}
          <RewardsSection
            badges={rewards.badges}
            streak={rewards.streak}
            achievements={rewards.achievements}
          />
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* 14. Notifications */}
          <NotificationsPanel
            items={notifications.items}
            unread={notifications.unread}
            onViewAll={actions.goToNotifications}
          />

          {/* 13. Subscription Card */}
          <SubscriptionCard
            isPremium={subscription?.isPremium || false}
            plan={subscription?.plan}
            endDate={subscription?.endDate}
            autoRenew={subscription?.autoRenew}
            features={subscription?.features}
            onUpgrade={actions.goToPayment}
            onRenew={actions.goToPayment}
          />

          <QuickLinksCard links={[
            { label: 'Study Material', onClick: actions.goToStudyMaterial },
            { label: 'Leaderboard', onClick: actions.goToLeaderboard },
            { label: 'Bookmarks', onClick: actions.goToBookmarks },
            { label: 'Support', onClick: actions.goToSettings },
            { label: 'Settings', onClick: actions.goToSettings },
          ]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
