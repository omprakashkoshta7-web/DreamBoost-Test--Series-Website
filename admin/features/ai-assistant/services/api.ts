import adminApiClient from '../../../utils/apiClient';

export const checkAIStatus = async () => {
  const { data } = await adminApiClient.get('/ai/status');
  return data.data;
};

export const sendAIChat = async (message: string, history: any[] = []) => {
  const { data } = await adminApiClient.post('/ai/chat', { message, history });
  return data.data;
};
