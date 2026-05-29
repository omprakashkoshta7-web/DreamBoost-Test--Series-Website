import apiClient from '@shared/utils/apiClient';
import { IUser } from '@store/types';

export const fetchProfile = async () => {
  const response = await apiClient.get('/profile');
  return response.data.data;
};

export const updateProfile = async (payload: { name?: string; email?: string; bio?: string; phone?: string; location?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string }): Promise<IUser> => {
  const response = await apiClient.put('/profile', payload);
  return response.data.data;
};

export const changePassword = async (payload: { currentPassword: string; newPassword: string }): Promise<void> => {
  await apiClient.post('/profile/change-password', payload);
};

export const uploadAvatar = async (payload: { avatar: string }): Promise<IUser> => {
  const response = await apiClient.put('/profile/avatar', payload);
  return response.data.data;
};

export const getCertificates = async (): Promise<any[]> => {
  const response = await apiClient.get('/profile/certificates');
  return response.data.data;
};

export const getPurchases = async (): Promise<any[]> => {
  const response = await apiClient.get('/profile/purchases');
  return response.data.data;
};

export const getAchievements = async (): Promise<any[]> => {
  const response = await apiClient.get('/profile/achievements');
  return response.data.data;
};
