import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLatestTestResult as fetchLatestTestResultApi, fetchTestResult as fetchTestResultApi } from '../services/api';
import type { TestResultData } from '../services/api';

export { TestResultData };
export const fetchTestResult = createAsyncThunk<TestResultData, string, { rejectValue: string }>(
  'testResult/fetchResult',
  async (resultId, { rejectWithValue }) => {
    try { return await fetchTestResultApi(resultId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch test result'); }
  }
);

export const fetchLatestTestResult = createAsyncThunk<TestResultData, string, { rejectValue: string }>(
  'testResult/fetchLatestResult',
  async (testId, { rejectWithValue }) => {
    try { return await fetchLatestTestResultApi(testId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch latest test result'); }
  }
);
