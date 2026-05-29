import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ISubject, IStudyMaterial, IChapter, IMyLibraryItem, IProfileProgress, IStudyMaterialState } from '@shared/types';
import { fetchSubjects as fetchSubjectsApi, fetchMaterials as fetchMaterialsApi, fetchMaterialDetail as fetchMaterialDetailApi, fetchChapters as fetchChaptersApi, updateMaterialProgress as updateMaterialProgressApi, fetchMyLibrary as fetchMyLibraryApi, fetchProfileProgress as fetchProfileProgressApi, purchaseMaterial as purchaseMaterialApi, verifyMaterialPurchase as verifyMaterialPurchaseApi } from '../services/api';

const initialState: IStudyMaterialState = {
  subjects: [],
  materials: [],
  selectedMaterial: null,
  chapters: [],
  libraryItems: [],
  profileProgress: null,
  loading: false,
  error: null,
  pagination: { totalPages: 1, currentPage: 1, totalMaterials: 0 },
  libraryPagination: { totalPages: 1, currentPage: 1, totalMaterials: 0 },
};

export const fetchSubjects = createAsyncThunk<ISubject[], void>('study/fetchSubjects', async (_, { rejectWithValue }) => {
  try { return await fetchSubjectsApi(); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch subjects'); }
});

export const fetchMaterials = createAsyncThunk<
  { materials: IStudyMaterial[]; totalPages: number; currentPage: number; totalMaterials: number },
  { subject?: string; category?: string; chapter?: string; search?: string; page?: number; limit?: number }
>('study/fetchMaterials', async (params, { rejectWithValue }) => {
  try { return await fetchMaterialsApi(params); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch materials'); }
});

export const fetchMaterialDetail = createAsyncThunk<IStudyMaterial, string>('study/fetchMaterialDetail', async (id, { rejectWithValue }) => {
  try { return await fetchMaterialDetailApi(id); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch material'); }
});

export const fetchChapters = createAsyncThunk<IChapter[], string>('study/fetchChapters', async (subjectId, { rejectWithValue }) => {
  try { return await fetchChaptersApi(subjectId); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch chapters'); }
});

export const updateMaterialProgress = createAsyncThunk<any, { materialId: string; subjectId?: string; progress?: number; isCompleted?: boolean; isBookmarked?: boolean; isDownloaded?: boolean; isInLibrary?: boolean }>(
  'study/updateProgress', async (data, { rejectWithValue }) => {
    try { return await updateMaterialProgressApi(data); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to update progress'); }
  }
);

export const fetchMyLibrary = createAsyncThunk<
  { materials: IMyLibraryItem[]; totalPages: number; currentPage: number; totalMaterials: number },
  { tab?: string; page?: number; limit?: number }
>('study/fetchMyLibrary', async (params, { rejectWithValue }) => {
  try { return await fetchMyLibraryApi(params); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch library'); }
});

export const fetchProfileProgress = createAsyncThunk<IProfileProgress, void>('study/fetchProfileProgress', async (_, { rejectWithValue }) => {
  try { return await fetchProfileProgressApi(); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch progress'); }
});

export const purchaseMaterial = createAsyncThunk<any, { materialId: string; paymentMethod: string }>('study/purchaseMaterial', async (params, { rejectWithValue }) => {
  try { return await purchaseMaterialApi(params); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to purchase material'); }
});

export const verifyMaterialPurchase = createAsyncThunk<any, { orderId: string; materialId: string; utr: string }>('study/verifyMaterialPurchase', async (params, { rejectWithValue }) => {
  try { return await verifyMaterialPurchaseApi(params); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to verify payment'); }
});

const studyMaterialSlice = createSlice({
  name: 'studyMaterial',
  initialState,
  reducers: {
    clearSelectedMaterial(state) { state.selectedMaterial = null; },
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => { state.subjects = action.payload; })
      .addCase(fetchMaterials.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload.materials;
        state.pagination = { totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, totalMaterials: action.payload.totalMaterials };
      })
      .addCase(fetchMaterials.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchMaterialDetail.pending, (state) => { state.loading = true; })
      .addCase(fetchMaterialDetail.fulfilled, (state, action) => { state.loading = false; state.selectedMaterial = action.payload; })
      .addCase(fetchMaterialDetail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchChapters.fulfilled, (state, action) => { state.chapters = action.payload; })
      .addCase(fetchMyLibrary.pending, (state) => { state.loading = true; })
      .addCase(fetchMyLibrary.fulfilled, (state, action) => {
        state.loading = false;
        state.libraryItems = action.payload.materials;
        state.libraryPagination = { totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, totalMaterials: action.payload.totalMaterials };
      })
      .addCase(fetchMyLibrary.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchProfileProgress.fulfilled, (state, action) => { state.profileProgress = action.payload; })
      .addCase(updateMaterialProgress.fulfilled, (state, action) => {
        if (state.selectedMaterial && action.payload.progress !== undefined) {
          state.selectedMaterial.progress = { ...state.selectedMaterial.progress, ...action.payload } as any;
        }
      })
      .addCase(purchaseMaterial.fulfilled, (state, action) => {
        if (state.selectedMaterial) {
          state.selectedMaterial.isLocked = !action.payload?.isPurchased;
          state.selectedMaterial.isPurchased = !!action.payload?.isPurchased;
        }
      })
      .addCase(verifyMaterialPurchase.fulfilled, (state) => {
        if (state.selectedMaterial) {
          state.selectedMaterial.isLocked = false;
          state.selectedMaterial.isPurchased = true;
        }
      });
  },
});

export const { clearSelectedMaterial, clearError } = studyMaterialSlice.actions;
export default studyMaterialSlice.reducer;
