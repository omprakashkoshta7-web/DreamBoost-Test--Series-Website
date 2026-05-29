import apiClient from '@shared/utils/apiClient';

export const fetchHomeData = async (): Promise<any> => {
  const response = await apiClient.get('/exam/home');
  return response.data.data;
};

export const fetchCategories = async (): Promise<any> => {
  const response = await apiClient.get('/exam/categories');
  return response.data.data;
};

export const fetchCategoryExams = async (categorySlug: string): Promise<any> => {
  const response = await apiClient.get(`/exam/categories/${categorySlug}/exams`);
  return response.data.data;
};

export const fetchExamDetail = async (examSlug: string): Promise<any> => {
  const response = await apiClient.get(`/exam/exams/${examSlug}`);
  return response.data.data;
};

export const checkTestAccess = async (testId: string): Promise<any> => {
  const response = await apiClient.get(`/exam/access/${testId}`);
  return response.data.data;
};

export const fetchUserDashboard = async (): Promise<any> => {
  const response = await apiClient.get('/exam/dashboard');
  return response.data.data;
};
