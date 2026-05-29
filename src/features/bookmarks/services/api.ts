import apiClient from '@shared/utils/apiClient';

export const fetchBookmarks = async (): Promise<any[]> => {
  const response = await apiClient.get('/bookmarks');
  return response.data.data.questions || response.data.data;
};

export const addBookmark = async (questionId: string): Promise<any> => {
  const response = await apiClient.post('/bookmarks', { questionId });
  return response.data.data;
};

export const removeBookmark = async (questionId: string): Promise<string> => {
  await apiClient.delete(`/bookmarks/${questionId}`);
  return questionId;
};
