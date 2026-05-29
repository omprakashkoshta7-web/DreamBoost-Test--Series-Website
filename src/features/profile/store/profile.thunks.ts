import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@store/types';
import { fetchProfile as fetchProfileApi, updateProfile as updateProfileApi, changePassword as changePasswordApi, uploadAvatar as uploadAvatarApi, getCertificates as getCertificatesApi, getPurchases as getPurchasesApi, getAchievements as getAchievementsApi } from '../services/api';

export const fetchProfile = createAsyncThunk<any, void, { rejectValue: string }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try { return await fetchProfileApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile'); }
  }
);

export const updateProfile = createAsyncThunk<IUser, { name?: string; email?: string; bio?: string; phone?: string; location?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string }, { rejectValue: string }>(
  'profile/updateProfile',
  async (payload, { rejectWithValue }) => {
    try { return await updateProfileApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to update profile'); }
  }
);

export const changePassword = createAsyncThunk<void, { currentPassword: string; newPassword: string }, { rejectValue: string }>(
  'profile/changePassword',
  async (payload, { rejectWithValue }) => {
    try { await changePasswordApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to change password'); }
  }
);

export const uploadAvatar = createAsyncThunk<IUser, { avatar: string }, { rejectValue: string }>(
  'profile/uploadAvatar',
  async (payload, { rejectWithValue }) => {
    try { return await uploadAvatarApi(payload); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to upload avatar'); }
  }
);

export const getCertificates = createAsyncThunk<any[], void, { rejectValue: string }>(
  'profile/getCertificates',
  async (_, { rejectWithValue }) => {
    try { return await getCertificatesApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch certificates'); }
  }
);

export const getPurchases = createAsyncThunk<any[], void, { rejectValue: string }>(
  'profile/getPurchases',
  async (_, { rejectWithValue }) => {
    try { return await getPurchasesApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch purchases'); }
  }
);

export const getAchievements = createAsyncThunk<any[], void, { rejectValue: string }>(
  'profile/getAchievements',
  async (_, { rejectWithValue }) => {
    try { return await getAchievementsApi(); }
    catch (error: any) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements'); }
  }
);
