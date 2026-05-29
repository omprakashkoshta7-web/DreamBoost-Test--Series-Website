import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotifications as fetchNotificationsApi, markAsRead as markAsReadApi, markAllAsRead as markAllAsReadApi, deleteNotification as deleteNotificationApi } from '../services/api';

export const fetchNotifications = createAsyncThunk<{ items: any[]; total: number; unreadCount: number }, void, { rejectValue: string }>(
  'notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try { return await fetchNotificationsApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications'); }
  }
);

export const markAsRead = createAsyncThunk<string, string, { rejectValue: string }>(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try { return await markAsReadApi(notificationId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to mark as read'); }
  }
);

export const markAllAsRead = createAsyncThunk<void, void, { rejectValue: string }>(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try { await markAllAsReadApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to mark all as read'); }
  }
);

export const deleteNotification = createAsyncThunk<string, string, { rejectValue: string }>(
  'notifications/delete',
  async (notificationId, { rejectWithValue }) => {
    try { return await deleteNotificationApi(notificationId); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to delete notification'); }
  }
);
