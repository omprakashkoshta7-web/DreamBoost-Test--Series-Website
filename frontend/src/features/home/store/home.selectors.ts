import { RootState } from '@store/store';

export const selectHomeData = (state: RootState) => (state as any).home?.homeData ?? null;
export const selectHomeLoading = (state: RootState) => (state as any).home?.loading ?? false;
export const selectHomeError = (state: RootState) => (state as any).home?.error ?? null;
