import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPayment as createPaymentApi,
  verifyPayment as verifyPaymentApi,
  fetchPaymentHistory as fetchPaymentHistoryApi,
  fetchCurrentPlan as fetchCurrentPlanApi,
} from '../services/api';

export const createPayment = createAsyncThunk<any, { plan: string; amount: number; paymentMethod: string; billingCycle?: 'monthly' | 'yearly'; couponCode?: string }, { rejectValue: string }>(
  'payment/createPayment',
  async (payload, { rejectWithValue }) => {
    try { return await createPaymentApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Payment failed'); }
  }
);

export const verifyPayment = createAsyncThunk<any, { orderId: string; utr: string }, { rejectValue: string }>(
  'payment/verifyPayment',
  async (payload, { rejectWithValue }) => {
    try { return await verifyPaymentApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Payment verification failed'); }
  }
);

export const fetchPaymentHistory = createAsyncThunk<any, void, { rejectValue: string }>(
  'payment/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    try { return await fetchPaymentHistoryApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment history'); }
  }
);

export const fetchCurrentPlan = createAsyncThunk<{ plan: string; endDate: string | null; autoRenew: boolean }, void, { rejectValue: string }>(
  'payment/fetchCurrentPlan',
  async (_, { rejectWithValue }) => {
    try { return await fetchCurrentPlanApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch current plan'); }
  }
);
