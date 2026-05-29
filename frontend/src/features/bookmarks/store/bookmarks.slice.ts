import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBookmarks as fetchBookmarksApi, addBookmark as addBookmarkApi, removeBookmark as removeBookmarkApi } from '../services/api';

export const fetchBookmarks = createAsyncThunk<any[], void, { rejectValue: string }>(
  'bookmarks/fetchBookmarks',
  async (_, { rejectWithValue }) => {
    try { return await fetchBookmarksApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookmarks'); }
  }
);

export const addBookmark = createAsyncThunk<any, string, { rejectValue: string }>(
  'bookmarks/addBookmark',
  async (questionId, { rejectWithValue }) => {
    try { return await addBookmarkApi(questionId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to add bookmark'); }
  }
);

export const removeBookmark = createAsyncThunk<string, string, { rejectValue: string }>(
  'bookmarks/removeBookmark',
  async (questionId, { rejectWithValue }) => {
    try { return await removeBookmarkApi(questionId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to remove bookmark'); }
  }
);

interface BookmarkState {
  questions: any[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  questions: [],
  count: 0,
  loading: false,
  error: null,
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.questions.push(action.payload);
        state.count = state.questions.length;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q: any) => q._id !== action.payload && q.questionId?._id !== action.payload);
        state.count = state.questions.length;
      });
  },
});

export default bookmarksSlice.reducer;
