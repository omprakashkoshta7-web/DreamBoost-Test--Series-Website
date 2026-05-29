import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LandingPage from '@features/landing/pages/LandingPage';
import ProtectedRoute from '@shared/components/ProtectedRoute';

const LazyDashboard = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const LazyTestSeriesList = lazy(() => import('@features/test-series/pages/TestSeriesPage'));
const LazyTestSeriesDetail = lazy(() => import('@features/test-series/pages/TestSeriesDetailPage'));
const LazyMyTests = lazy(() => import('@features/test-series/pages/MyTestsPage'));
const LazyTestInstructions = lazy(() => import('@features/test-exam/pages/TestInstructionsPage'));
const LazyTestExam = lazy(() => import('@features/test-exam/pages/TestExamPage'));
const LazyTestResult = lazy(() => import('@features/test-result/pages/TestResultPage'));
const LazyProfile = lazy(() => import('@features/profile/pages/ProfilePage'));
const LazyLeaderboard = lazy(() => import('@features/leaderboard/pages/LeaderboardPage'));
const LazyPayment = lazy(() => import('@features/payment/pages/PaymentPage'));
const LazySettings = lazy(() => import('@features/settings/pages/SettingsPage'));
const LazyNotifications = lazy(() => import('@features/notifications/pages/NotificationsPage'));
const LazySupport = lazy(() => import('@features/support/pages/SupportPage'));
const LazyBookmarks = lazy(() => import('@features/bookmarks/pages/BookmarksPage'));
const LazyStudyMaterial = lazy(() => import('@features/study-material/pages/StudyMaterialPage'));
const LazySubjectDetail = lazy(() => import('@features/study-material/pages/SubjectDetailPage'));
const LazyMaterialView = lazy(() => import('@features/study-material/pages/MaterialViewPage'));
const LazyMyLibrary = lazy(() => import('@features/study-material/pages/MyLibraryPage'));
const LazyStudyProgress = lazy(() => import('@features/study-material/pages/StudyProgressPage'));
const LazyExamCategory = lazy(() => import('@features/exam/pages/ExamCategoryPage'));
const LazyExamSelect = lazy(() => import('@features/exam/pages/ExamSelectPage'));
const LazyExamDetail = lazy(() => import('@features/exam/pages/TestSeriesPage'));
const LazyTestList = lazy(() => import('@features/exam/pages/TestListPage'));

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: '/app/auth',
        children: [
          { path: 'login', element: <Navigate to="/?auth=login" replace /> },
          { path: 'signin', element: <Navigate to="/?auth=login" replace /> },
          { path: 'register', lazy: () => import('@features/auth/pages/RegisterPage').then(m => ({ Component: m.default })) },
          { path: 'otp-verify', lazy: () => import('@features/auth/pages/OtpVerifyPage').then(m => ({ Component: m.default })) },
          { path: 'profile-setup', lazy: () => import('@features/auth/pages/ProfileSetupPage').then(m => ({ Component: m.default })) },
          { path: 'forgot-password', lazy: () => import('@features/auth/pages/ForgotPasswordPage').then(m => ({ Component: m.default })) },
          { path: 'github/callback', lazy: () => import('@features/auth/pages/GithubCallbackPage').then(m => ({ Component: m.default })) },
        ],
      },
      { path: '/app/exam-categories', element: <ProtectedRoute><LazyExamCategory /></ProtectedRoute> },
      { path: '/app/exam-categories/:categorySlug', element: <ProtectedRoute><LazyExamSelect /></ProtectedRoute> },
      { path: '/app/exam-landing/:examSlug', element: <ProtectedRoute><LazyExamDetail /></ProtectedRoute> },
      { path: '/app/exam-landing/:examSlug/:testType', element: <ProtectedRoute><LazyTestList /></ProtectedRoute> },
      { path: '/app/dashboard', element: <ProtectedRoute><LazyDashboard /></ProtectedRoute> },
      { path: '/app/my-tests', element: <ProtectedRoute><LazyMyTests /></ProtectedRoute> },
      { path: '/app/test-series', element: <ProtectedRoute><LazyTestSeriesList /></ProtectedRoute> },
      { path: '/app/series/:examSlug/:testId', element: <ProtectedRoute><LazyTestSeriesDetail /></ProtectedRoute> },
      { path: '/app/test-instructions/:testId', element: <ProtectedRoute><LazyTestInstructions /></ProtectedRoute> },
      { path: '/app/test-exam/:testId', element: <ProtectedRoute><LazyTestExam /></ProtectedRoute> },
      { path: '/app/test-result/:testId', element: <ProtectedRoute><LazyTestResult /></ProtectedRoute> },
      { path: '/app/test-result/:testId/:resultId', element: <ProtectedRoute><LazyTestResult /></ProtectedRoute> },
      { path: '/app/profile', element: <ProtectedRoute><LazyProfile /></ProtectedRoute> },
      { path: '/app/leaderboard', element: <ProtectedRoute><LazyLeaderboard /></ProtectedRoute> },
      { path: '/app/payment', element: <ProtectedRoute><LazyPayment /></ProtectedRoute> },
      { path: '/app/settings', element: <ProtectedRoute><LazySettings /></ProtectedRoute> },
      { path: '/app/notifications', element: <ProtectedRoute><LazyNotifications /></ProtectedRoute> },
      { path: '/app/support', element: <ProtectedRoute><LazySupport /></ProtectedRoute> },
      { path: '/app/bookmarks', element: <ProtectedRoute><LazyBookmarks /></ProtectedRoute> },
      { path: '/app/study-material', element: <ProtectedRoute><LazyStudyMaterial /></ProtectedRoute> },
      { path: '/app/study-material/subject/:subjectId', element: <ProtectedRoute><LazySubjectDetail /></ProtectedRoute> },
      { path: '/app/study-material/view/:materialId', element: <ProtectedRoute><LazyMaterialView /></ProtectedRoute> },
      { path: '/app/my-library', element: <ProtectedRoute><LazyMyLibrary /></ProtectedRoute> },
      { path: '/app/study-progress', element: <ProtectedRoute><LazyStudyProgress /></ProtectedRoute> },
    ],
  },
  { path: '*', lazy: () => import('@shared/pages/NotFoundPage').then(m => ({ Component: m.default })) },
]);
