import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFullDashboard } from '../services/api';
import type { FullDashboardData } from '../services/api';

export const fetchDashboardStats = createAsyncThunk<FullDashboardData, void, { rejectValue: string }>(
  'dashboard/fetchFull',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFullDashboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);
