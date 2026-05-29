import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboard, fetchUserRank } from './leaderboard.thunks';

interface LeaderboardState {
  entries: any[];
  userRank: { rank: number; totalScore: number } | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

const initialState: LeaderboardState = {
  entries: [],
  userRank: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 20,
    hasMore: false,
  },
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload?.entries || [];
        state.userRank = action.payload?.userRank || null;
        state.pagination = {
          total: action.payload?.total || 0,
          page: action.payload?.page || 1,
          limit: action.payload?.limit || 20,
          hasMore: Boolean(action.payload?.hasMore),
        };
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserRank.fulfilled, (state, action) => {
        state.userRank = action.payload.rank
          ? { rank: action.payload.rank, totalScore: action.payload.totalScore }
          : null;
      });
  },
});

export default leaderboardSlice.reducer;
