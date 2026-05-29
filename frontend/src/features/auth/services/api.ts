import apiClient from '@shared/utils/apiClient';
import { IUser } from '@store/types';

interface LoginPayload { email: string; password: string; }
interface GoogleLoginPayload { accessToken: string; }
interface GithubLoginPayload { code: string; redirectUri: string; }
interface RegisterPayload { name: string; email: string; password: string; }
interface AuthResponse { user: IUser; token: string; refreshToken: string; }
interface SendOTPPayload { email: string; }
interface OTPResponse { email: string; expiresAt: string; }
interface VerifyOTPPayload { email: string; otp: string; }
interface VerifyOTPResponse { email: string; isVerified: boolean; }
interface ProfileSetupPayload { phone?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string; }
interface ForgotPasswordPayload { email: string; }
interface ForgotPasswordResponse { email: string; expiresAt: string; }
interface VerifyResetCodePayload { email: string; code: string; }
interface VerifyResetCodeResponse { email: string; verified: boolean; }
interface ResetPasswordPayload { email: string; code: string; newPassword: string; }

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', payload);
  const { user, token, refreshToken } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  return { user, token, refreshToken };
};

export const googleLogin = async (payload: GoogleLoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/google', payload);
  const { user, token, refreshToken } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  return { user, token, refreshToken };
};

export const githubLogin = async (payload: GithubLoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/github', payload);
  const { user, token, refreshToken } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  return { user, token, refreshToken };
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', payload);
  const { user, token, refreshToken } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  return { user, token, refreshToken };
};

export const logout = async () => {
  try { await apiClient.post('/auth/logout'); } catch { /* ignore */ }
  finally { localStorage.removeItem('token'); localStorage.removeItem('refreshToken'); }
};

export const getMe = async (): Promise<IUser> => {
  const response = await apiClient.get('/auth/me');
  return response.data.data;
};

export const sendOTP = async (payload: SendOTPPayload): Promise<OTPResponse> => {
  const response = await apiClient.post('/otp/send-otp', payload);
  return response.data.data;
};

export const verifyOTP = async (payload: VerifyOTPPayload): Promise<VerifyOTPResponse> => {
  const response = await apiClient.post('/otp/verify-otp', payload);
  return response.data.data;
};

export const resendOTP = async (payload: SendOTPPayload): Promise<OTPResponse> => {
  const response = await apiClient.post('/otp/resend-otp', payload);
  return response.data.data;
};

export const profileSetup = async (payload: ProfileSetupPayload): Promise<IUser> => {
  const response = await apiClient.post('/otp/profile-setup', payload);
  return response.data.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post('/auth/forgot-password', payload);
  return response.data.data;
};

export const verifyResetCode = async (payload: VerifyResetCodePayload): Promise<VerifyResetCodeResponse> => {
  const response = await apiClient.post('/auth/verify-reset-code', payload);
  return response.data.data;
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<void> => {
  await apiClient.post('/auth/reset-password', payload);
};
