import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHomeData as fetchHomeDataApi } from '../services/api';

export const loadHomeData = createAsyncThunk<any, void, { rejectValue: string }>(
  'home/loadHomeData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchHomeDataApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load home data');
    }
  }
);

interface HomeState {
  homeData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homeData: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      .addCase(loadHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
