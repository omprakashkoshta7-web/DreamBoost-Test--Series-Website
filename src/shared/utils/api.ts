const API_ORIGIN = (import.meta.env.VITE_API_URL || 'https://backend-microservices-testseries.onrender.com').replace(/\/+$/, '');

export const API_BASE_URL = API_ORIGIN.endsWith('/api') ? API_ORIGIN : `${API_ORIGIN}/api`;

export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_GOOGLE: '/auth/google',
  AUTH_GITHUB: '/auth/github',
  AUTH_ME: '/auth/me',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_VERIFY_RESET_CODE: '/auth/verify-reset-code',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  OTP_SEND: '/otp/send-otp',
  OTP_VERIFY: '/otp/verify-otp',
  OTP_RESEND: '/otp/resend-otp',
  OTP_PROFILE_SETUP: '/otp/profile-setup',
  DASHBOARD_FULL: '/dashboard/full',
  PROFILE_GET: '/profile',
  PROFILE_UPDATE: '/profile',
  PROFILE_CHANGE_PASSWORD: '/profile/change-password',
  PROFILE_AVATAR: '/profile/avatar',
  PROFILE_CERTIFICATES: '/profile/certificates',
  PROFILE_PURCHASES: '/profile/purchases',
  PROFILE_ACHIEVEMENTS: '/profile/achievements',
  SETTINGS_GET: '/settings',
  SETTINGS_UPDATE: '/settings',
  SETTINGS_LOGOUT_ALL: '/settings/logout-all',
  TESTS_LIST: '/tests',
  TESTS_GET: (id: string) => `/tests/${id}`,
  TESTS_SUBMIT: (id: string) => `/tests/${id}/submit`,
  TESTS_COMPLETED_CATEGORIES: '/tests/completed-categories',
  TESTS_ENROLL: '/tests/enroll',
  TESTS_MY: '/tests/my',
  TESTS_RESULT: (id: string | number) => `/tests/result/${id}`,
  TESTS_RESULT_LATEST: (id: string) => `/tests/result/latest/${id}`,
  EXAM_CATEGORIES: '/exam/categories',
  EXAM_CATEGORY_EXAMS: (slug: string) => `/exam/categories/${slug}/exams`,
  EXAM_EXAMS: (slug: string) => `/exam/exams/${slug}`,
  EXAM_HOME: '/exam/home',
  EXAM_ACCESS: (id: string) => `/exam/access/${id}`,
  EXAM_DASHBOARD: '/exam/dashboard',
  PAYMENTS_CREATE: '/payments',
  PAYMENTS_LIST: '/payments',
  PAYMENTS_VERIFY: (orderId: string) => `/payments/${orderId}/verify`,
  PAYMENTS_CURRENT_PLAN: '/payments/current-plan',
  PAYMENTS_APPLY_COUPON: '/payments/apply-coupon',
  SUBSCRIPTION_PLANS: '/subscription/plans',
  BOOKMARKS_LIST: '/bookmarks',
  BOOKMARKS_ADD: '/bookmarks',
  BOOKMARKS_REMOVE: (questionId: string | number) => `/bookmarks/${questionId}`,
  NOTIFICATIONS_LIST: '/notifications',
  NOTIFICATIONS_READ: (id: string | number) => `/notifications/${id}/read`,
  NOTIFICATIONS_READ_ALL: '/notifications/read-all',
  NOTIFICATIONS_DELETE: (id: string | number) => `/notifications/${id}`,
  LEADERBOARD_GET: '/leaderboard',
  LEADERBOARD_RANK: (userId: string) => `/leaderboard/${userId}/rank`,
  STUDY_SUBJECTS: '/study/subjects',
  STUDY_MATERIALS: (q?: string) => q ? `/study/materials?${q}` : '/study/materials',
  STUDY_MATERIAL: (id: string | number) => `/study/materials/${id}`,
  STUDY_CHAPTERS: (subjectId: string) => `/study/subjects/${subjectId}/chapters`,
  STUDY_PROGRESS: '/study/progress',
  STUDY_MY_LIBRARY: (q?: string) => q ? `/study/my-library?${q}` : '/study/my-library',
  STUDY_PROFILE_PROGRESS: '/study/profile-progress',
  STUDY_PURCHASE: '/study/purchase',
  STUDY_PURCHASE_VERIFY: '/study/purchase/verify',
  FAQS: '/faqs',
  TICKETS_LIST: '/tickets',
  TICKETS_CREATE: '/tickets',
  TICKETS_GET: (id: string | number) => `/tickets/${id}`,
  TICKETS_REPLY: (id: string | number) => `/tickets/${id}/reply`,
};

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
