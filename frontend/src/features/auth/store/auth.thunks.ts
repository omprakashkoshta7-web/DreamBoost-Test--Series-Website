import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@store/types';
import * as authApi from '../services/api';

export const loginUser = createAsyncThunk<
  { user: IUser; token: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try { return await authApi.login(payload); }
  catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Login failed'); }
});

export const googleLoginUser = createAsyncThunk<
  { user: IUser; token: string; refreshToken: string },
  { accessToken: string },
  { rejectValue: string }
>('auth/googleLogin', async (payload, { rejectWithValue }) => {
  try { return await authApi.googleLogin(payload); }
  catch (error: any) { return rejectWithValue(error.response?.data?.message || error.message || 'Google login failed'); }
});

export const githubLoginUser = createAsyncThunk<
  { user: IUser; token: string; refreshToken: string },
  { code: string; redirectUri: string },
  { rejectValue: string }
>('auth/githubLogin', async (payload, { rejectWithValue }) => {
  try { return await authApi.githubLogin(payload); }
  catch (error: any) { return rejectWithValue(error.response?.data?.message || error.message || 'GitHub login failed'); }
});

export const registerUser = createAsyncThunk<
  { user: IUser; token: string; refreshToken: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try { return await authApi.register(payload); }
  catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Registration failed'); }
});

export const logoutUser = createAsyncThunk<void>('auth/logout', async () => {
  await authApi.logout();
});

export const getMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
  'auth/getMe', async (_, { rejectWithValue }) => {
    try { return await authApi.getMe(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch user'); }
  }
);

export const sendOTP = createAsyncThunk<{ email: string; expiresAt: string }, { email: string }, { rejectValue: string }>(
  'auth/sendOTP', async (payload, { rejectWithValue }) => {
    try { return await authApi.sendOTP(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to send OTP'); }
  }
);

export const verifyOTP = createAsyncThunk<{ email: string; isVerified: boolean }, { email: string; otp: string }, { rejectValue: string }>(
  'auth/verifyOTP', async (payload, { rejectWithValue }) => {
    try { return await authApi.verifyOTP(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'OTP verification failed'); }
  }
);

export const resendOTP = createAsyncThunk<{ email: string; expiresAt: string }, { email: string }, { rejectValue: string }>(
  'auth/resendOTP', async (payload, { rejectWithValue }) => {
    try { return await authApi.resendOTP(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP'); }
  }
);

export const profileSetup = createAsyncThunk<IUser, { phone?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string }, { rejectValue: string }>(
  'auth/profileSetup', async (payload, { rejectWithValue }) => {
    try { return await authApi.profileSetup(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Profile setup failed'); }
  }
);

export const forgotPassword = createAsyncThunk<{ email: string; expiresAt: string }, { email: string }, { rejectValue: string }>(
  'auth/forgotPassword', async (payload, { rejectWithValue }) => {
    try { return await authApi.forgotPassword(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to send reset code'); }
  }
);

export const verifyResetCode = createAsyncThunk<{ email: string; verified: boolean }, { email: string; code: string }, { rejectValue: string }>(
  'auth/verifyResetCode', async (payload, { rejectWithValue }) => {
    try { return await authApi.verifyResetCode(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Invalid reset code'); }
  }
);

export const resetPassword = createAsyncThunk<void, { email: string; code: string; newPassword: string }, { rejectValue: string }>(
  'auth/resetPassword', async (payload, { rejectWithValue }) => {
    try { await authApi.resetPassword(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to reset password'); }
  }
);
