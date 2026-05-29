import { RootState } from '@store/store';

export const selectTestResult = (state: RootState) => state.testResult.result;
export const selectTestResultLoading = (state: RootState) => state.testResult.loading;
export const selectTestResultError = (state: RootState) => state.testResult.error;
