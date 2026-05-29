import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile, changePassword, uploadAvatar, getCertificates, getPurchases, getAchievements } from './profile.thunks';
import { IUser } from '@store/types';

interface Purchase {
  id: string;
  plan: string;
  amount: string;
  date: string;
  status: string;
  expiry: string;
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

interface PerformanceEntry {
  test: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  rank: string;
  date: string;
}

interface Certificate {
  id: string;
  title: string;
  score: string;
  date: string;
}

interface ProfileState {
  profile: IUser | null;
  stats: {
    testsCompleted: number;
    totalPoints: number;
    streak: number;
    achievements: number;
  } | null;
  performanceHistory: PerformanceEntry[];
  activePlan: { plan: string; endDate: string } | null;
  certificates: Certificate[];
  purchases: Purchase[];
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  stats: null,
  performanceHistory: [],
  activePlan: null,
  certificates: [],
  purchases: [],
  achievements: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.stats = null;
      state.performanceHistory = [];
      state.activePlan = null;
      state.certificates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.stats = action.payload.stats;
        state.performanceHistory = action.payload.performanceHistory;
        state.activePlan = action.payload.activePlan;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(getCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;
      })
      .addCase(getPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
