import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLeaderboard as fetchLeaderboardApi, fetchUserRank as fetchUserRankApi } from '../services/api';

export const fetchLeaderboard = createAsyncThunk<any, { timeFilter?: string; page?: number; limit?: number }, { rejectValue: string }>(
  'leaderboard/fetchLeaderboard',
  async (params, { rejectWithValue }) => {
    try { return await fetchLeaderboardApi(params); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard'); }
  }
);

export const fetchUserRank = createAsyncThunk<any, string, { rejectValue: string }>(
  'leaderboard/fetchUserRank',
  async (userId, { rejectWithValue }) => {
    try { return await fetchUserRankApi(userId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch user rank'); }
  }
);
