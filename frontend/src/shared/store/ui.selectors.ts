import { RootState } from '@store/store';

export const selectUILoading = (state: RootState) => state.ui.isLoading;
export const selectToasts = (state: RootState) => state.ui.toasts;
export const selectModals = (state: RootState) => state.ui.modals;
export const selectIsModalOpen = (modalName: string) => (state: RootState) =>
  state.ui.modals[modalName] || false;
