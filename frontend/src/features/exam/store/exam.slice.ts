import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories as getCategoriesApi, getCategoryExams as getCategoryExamsApi, getExamDetail as getExamDetailApi } from '../services/api';

interface ExamState {
  categories: any[];
  categoryExams: any[];
  currentCategory: any | null;
  currentExam: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExamState = {
  categories: [],
  categoryExams: [],
  currentCategory: null,
  currentExam: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<any[], void, { rejectValue: string }>(
  'exam/fetchCategories',
  async (_, { rejectWithValue }) => {
    try { return await getCategoriesApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories'); }
  }
);

export const fetchCategoryExams = createAsyncThunk<any[], string, { rejectValue: string }>(
  'exam/fetchCategoryExams',
  async (slug, { rejectWithValue }) => {
    try { return await getCategoryExamsApi(slug); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch category exams'); }
  }
);

export const fetchExamDetail = createAsyncThunk<any, string, { rejectValue: string }>(
  'exam/fetchExamDetail',
  async (slug, { rejectWithValue }) => {
    try { return await getExamDetailApi(slug); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch exam detail'); }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    clearCurrentExam: (state) => { state.currentExam = null; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchCategoryExams.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategoryExams.fulfilled, (state, action) => {
        state.loading = false;
        const payload: any = action.payload;
        if (payload && typeof payload === 'object' && payload.exams) {
          state.categoryExams = payload.exams;
          state.currentCategory = payload.category || null;
        } else {
          state.categoryExams = payload || [];
        }
      })
      .addCase(fetchCategoryExams.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchExamDetail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchExamDetail.fulfilled, (state, action) => { state.loading = false; state.currentExam = action.payload; })
      .addCase(fetchExamDetail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { clearCurrentExam, clearError } = examSlice.actions;
export default examSlice.reducer;
