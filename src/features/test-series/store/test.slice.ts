import { createSlice } from '@reduxjs/toolkit';
import { fetchTests, fetchTest, submitTest, fetchCompletedCategories } from './test.thunks';

interface TestState {
  tests: any[];
  currentTest: any | null;
  submitResult: any;
  completedCategories: string[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

const initialState: TestState = {
  tests: [],
  currentTest: null,
  submitResult: null,
  completedCategories: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    hasMore: false,
  },
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    clearCurrentTest: (state) => {
      state.currentTest = null;
    },
    clearSubmitResult: (state) => {
      state.submitResult = null;
    },
    clearCompletedCategories: (state) => {
      state.completedCategories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload.items;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
          hasMore: action.payload.hasMore,
        };
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTest = action.payload;
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.loading = false;
        state.submitResult = action.payload;
        if (action.payload?.hasPremiumInCategory && action.payload?.category) {
          if (!state.completedCategories.includes(action.payload.category)) {
            state.completedCategories.push(action.payload.category);
          }
        }
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompletedCategories.fulfilled, (state, action) => {
        state.completedCategories = action.payload;
      });
  },
});

export const { clearCurrentTest, clearSubmitResult, clearCompletedCategories } = testSlice.actions;
export default testSlice.reducer;
