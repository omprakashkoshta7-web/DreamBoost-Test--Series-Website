import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/auth.slice';
import dashboardReducer from '@features/dashboard/store/dashboard.slice';
import testReducer from '@features/test-series/store/test.slice';
import timerReducer from '@features/test-series/store/timer.slice';
import paymentReducer from '@features/payment/store/payment.slice';
import leaderboardReducer from '@features/leaderboard/store/leaderboard.slice';
import profileReducer from '@features/profile/store/profile.slice';
import testResultReducer from '@features/test-result/store/result.slice';
import notificationReducer from '@features/notifications/store/notification.slice';
import supportReducer from '@features/support/store/support.slice';
import bookmarkReducer from '@features/bookmarks/store/bookmarks.slice';
import studyMaterialReducer from '@features/study-material/store/study-material.slice';
import examReducer from '@features/exam/store/exam.slice';
import uiReducer from '@shared/store/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    test: testReducer,
    timer: timerReducer,
    payment: paymentReducer,
    leaderboard: leaderboardReducer,
    profile: profileReducer,
    testResult: testResultReducer,
    notifications: notificationReducer,
    support: supportReducer,
    bookmarks: bookmarkReducer,
    studyMaterial: studyMaterialReducer,
    exam: examReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled', 'auth/logout'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
