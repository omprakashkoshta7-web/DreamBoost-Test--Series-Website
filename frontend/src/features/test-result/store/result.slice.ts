import { createSlice } from '@reduxjs/toolkit';
import { fetchLatestTestResult, fetchTestResult, TestResultData } from './result.thunks';

interface TestResultState {
  result: TestResultData | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestResultState = {
  result: null,
  loading: false,
  error: null,
};

const testResultSlice = createSlice({
  name: 'testResult',
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLatestTestResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchLatestTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResult } = testResultSlice.actions;
export default testResultSlice.reducer;
