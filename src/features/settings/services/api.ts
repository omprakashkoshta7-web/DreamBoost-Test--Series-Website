import apiClient from '@shared/utils/apiClient';

export const fetchSettings = async (): Promise<Record<string, any>> => {
  const response = await apiClient.get('/settings');
  return response.data.data || response.data;
};

export const updateSettings = async (data: Record<string, any>): Promise<Record<string, any>> => {
  const response = await apiClient.patch('/settings', data);
  return response.data.data || response.data;
};
