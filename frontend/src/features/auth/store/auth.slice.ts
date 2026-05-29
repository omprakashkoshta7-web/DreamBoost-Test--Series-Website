import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, googleLoginUser, githubLoginUser, registerUser, logoutUser, getMe, sendOTP, verifyOTP, resendOTP, profileSetup, forgotPassword, verifyResetCode, resetPassword } from './auth.thunks';
import { IUser } from '@store/types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  otpLoading: boolean;
  otpError: string | null;
  profileSetupLoading: boolean;
  profileSetupError: string | null;
  forgotPasswordLoading: boolean;
  forgotPasswordError: string | null;
  resetPasswordSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
  otpLoading: false,
  otpError: null,
  profileSetupLoading: false,
  profileSetupError: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  resetPasswordSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOTPError: (state) => {
      state.otpError = null;
    },
    clearProfileSetupError: (state) => {
      state.profileSetupError = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: IUser; token: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(githubLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(githubLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(githubLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      })
      .addCase(sendOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.otpLoading = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload as string;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.otpLoading = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload as string;
      })
      .addCase(resendOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.otpLoading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload as string;
      })
      .addCase(profileSetup.pending, (state) => {
        state.profileSetupLoading = true;
        state.profileSetupError = null;
      })
      .addCase(profileSetup.fulfilled, (state, action) => {
        state.profileSetupLoading = false;
        state.user = action.payload;
      })
      .addCase(profileSetup.rejected, (state, action) => {
        state.profileSetupLoading = false;
        state.profileSetupError = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload as string;
      })
      .addCase(verifyResetCode.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(verifyResetCode.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload as string;
      });
  },
});

export const { clearError, clearOTPError, clearProfileSetupError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
