import { RootState } from '@store/store';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectOTPLoading = (state: RootState) => state.auth.otpLoading;
export const selectOTPError = (state: RootState) => state.auth.otpError;
export const selectProfileSetupLoading = (state: RootState) => state.auth.profileSetupLoading;
export const selectProfileSetupError = (state: RootState) => state.auth.profileSetupError;
export const selectForgotPasswordLoading = (state: RootState) => state.auth.forgotPasswordLoading;
export const selectForgotPasswordError = (state: RootState) => state.auth.forgotPasswordError;
export const selectResetPasswordSuccess = (state: RootState) => state.auth.resetPasswordSuccess;
