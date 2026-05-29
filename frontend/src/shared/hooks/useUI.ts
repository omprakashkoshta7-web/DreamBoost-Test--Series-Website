import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToast, removeToast, setLoading, openModal, closeModal } from '@shared/store/ui.slice';
import { selectUILoading, selectToasts, selectIsModalOpen } from '@shared/store/ui.selectors';

export const useUI = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUILoading);
  const toasts = useAppSelector(selectToasts);

  return {
    loading,
    toasts,
    setLoading: (value: boolean) => dispatch(setLoading(value)),
    showToast: (
      message: string,
      type: 'success' | 'error' | 'info' | 'warning' = 'info'
    ) => {
      const id = Date.now().toString();
      dispatch(addToast({ id, message, type }));
      setTimeout(() => dispatch(removeToast(id)), 3000);
    },
    openModal: (name: string) => dispatch(openModal(name)),
    closeModal: (name: string) => dispatch(closeModal(name)),
  };
};

export const useModal = (modalName: string) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => selectIsModalOpen(modalName)(state));

  return {
    isOpen,
    open: () => dispatch(openModal(modalName)),
    close: () => dispatch(closeModal(modalName)),
    toggle: () => (isOpen ? dispatch(closeModal(modalName)) : dispatch(openModal(modalName))),
  };
};
