import { RootState } from '@store/store';

export const selectBookmarkQuestions = (state: RootState) => state.bookmarks.questions;
export const selectBookmarkCount = (state: RootState) => state.bookmarks.count;
export const selectBookmarkLoading = (state: RootState) => state.bookmarks.loading;
export const selectBookmarkError = (state: RootState) => state.bookmarks.error;
