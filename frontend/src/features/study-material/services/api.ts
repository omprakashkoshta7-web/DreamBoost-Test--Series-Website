import apiClient from '@shared/utils/apiClient';

export const fetchSubjects = async () => {
  const res = await apiClient.get('/study/subjects');
  return res.data.data.subjects;
};

export const fetchMaterials = async (params: { subject?: string; category?: string; chapter?: string; search?: string; page?: number; limit?: number }) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) q.append(k, String(v)); });
  const res = await apiClient.get(`/study/materials?${q.toString()}`);
  return res.data.data;
};

export const fetchMaterialDetail = async (id: string) => {
  const res = await apiClient.get(`/study/materials/${id}`);
  return res.data.data;
};

export const fetchChapters = async (subjectId: string) => {
  const res = await apiClient.get(`/study/subjects/${subjectId}/chapters`);
  return res.data.data.chapters;
};

export const updateMaterialProgress = async (data: { materialId: string; subjectId?: string; progress?: number; isCompleted?: boolean; isBookmarked?: boolean; isDownloaded?: boolean; isInLibrary?: boolean }) => {
  const res = await apiClient.post('/study/progress', data);
  return res.data.data;
};

export const fetchMyLibrary = async (params: { tab?: string; page?: number; limit?: number }) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) q.append(k, String(v)); });
  const res = await apiClient.get(`/study/my-library?${q.toString()}`);
  return res.data.data;
};

export const fetchProfileProgress = async () => {
  const res = await apiClient.get('/study/profile-progress');
  return res.data.data;
};

export const purchaseMaterial = async ({ materialId, paymentMethod }: { materialId: string; paymentMethod: string }) => {
  const res = await apiClient.post('/study/purchase', { materialId, paymentMethod });
  return res.data.data;
};

export const verifyMaterialPurchase = async ({ orderId, materialId, utr }: { orderId: string; materialId: string; utr: string }) => {
  const res = await apiClient.post('/study/purchase/verify', { orderId, materialId, utr });
  return res.data.data;
};
