import { RootState } from '@store/store';

export const selectTests = (state: RootState) => state.test.tests;
export const selectCurrentTest = (state: RootState) => state.test.currentTest;
export const selectSubmitResult = (state: RootState) => state.test.submitResult;
export const selectTestLoading = (state: RootState) => state.test.loading;
export const selectTestError = (state: RootState) => state.test.error;
export const selectTestPagination = (state: RootState) => state.test.pagination;
export const selectCompletedCategories = (state: RootState) => state.test.completedCategories;
