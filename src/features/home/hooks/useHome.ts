import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectHomeData, selectHomeLoading, selectHomeError } from '../store/home.selectors';
import { loadHomeData } from '../store/home.slice';

export const useHome = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectHomeData);
  const loading = useAppSelector(selectHomeLoading);
  const error = useAppSelector(selectHomeError);
  const refresh = useCallback(() => dispatch(loadHomeData()), [dispatch]);

  return { content, loading, error, refresh };
};
