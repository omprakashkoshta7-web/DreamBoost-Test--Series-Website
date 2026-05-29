import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardStats } from './dashboard.thunks';
import type { FullDashboardData } from '../services/api';

interface DashboardState {
  stats: FullDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(fetchDashboardStats.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default dashboardSlice.reducer;
