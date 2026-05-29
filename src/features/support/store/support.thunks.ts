import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFAQs as fetchFAQsApi, fetchMyTickets as fetchMyTicketsApi, createTicket as createTicketApi, fetchTicketDetail as fetchTicketDetailApi, replyToTicket as replyToTicketApi } from '../services/api';

export const fetchFAQs = createAsyncThunk<any, void, { rejectValue: string }>(
  'support/fetchFAQs',
  async (_, { rejectWithValue }) => {
    try { return await fetchFAQsApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch FAQs'); }
  }
);

export const fetchMyTickets = createAsyncThunk<any, { page?: number; limit?: number }, { rejectValue: string }>(
  'support/fetchMyTickets',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try { return await fetchMyTicketsApi({ page, limit }); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets'); }
  }
);

export const createTicket = createAsyncThunk<any, { subject: string; description: string; category: string; priority: string }, { rejectValue: string }>(
  'support/createTicket',
  async (payload, { rejectWithValue }) => {
    try { return await createTicketApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to create ticket'); }
  }
);

export const fetchTicketDetail = createAsyncThunk<any, string, { rejectValue: string }>(
  'support/fetchTicketDetail',
  async (id, { rejectWithValue }) => {
    try { return await fetchTicketDetailApi(id); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch ticket detail'); }
  }
);

export const replyToTicket = createAsyncThunk<any, { id: string; message: string }, { rejectValue: string }>(
  'support/replyToTicket',
  async ({ id, message }, { rejectWithValue }) => {
    try { return await replyToTicketApi(id, message); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to reply to ticket'); }
  }
);
