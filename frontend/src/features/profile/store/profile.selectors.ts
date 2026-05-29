import { RootState } from '@store/store';

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileStats = (state: RootState) => state.profile.stats;
export const selectProfilePerformanceHistory = (state: RootState) => state.profile.performanceHistory;
export const selectProfileActivePlan = (state: RootState) => state.profile.activePlan;
export const selectProfileCertificates = (state: RootState) => state.profile.certificates;
export const selectProfilePurchases = (state: RootState) => state.profile.purchases;
export const selectProfileAchievements = (state: RootState) => state.profile.achievements;
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;
