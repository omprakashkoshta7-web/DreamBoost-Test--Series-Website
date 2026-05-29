import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchMaterialDetail,
  updateMaterialProgress,
} from '../store/study-material.slice';
import { useMaterialPurchase } from './useMaterialPurchase';

export const useMaterialDetail = (materialId: string | undefined) => {
  const dispatch = useAppDispatch();
  const { selectedMaterial: material, loading } = useAppSelector((state) => state.studyMaterial);

  const purchase = useMaterialPurchase(material);

  useEffect(() => {
    if (materialId) dispatch(fetchMaterialDetail(materialId));
  }, [dispatch, materialId]);

  const [markedComplete, setMarkedComplete] = useState(false);

  useEffect(() => {
    if (material?.progress?.isCompleted) setMarkedComplete(true);
  }, [material]);

  const handleBookmark = useCallback(() => {
    if (!material) return;
    dispatch(updateMaterialProgress({
      materialId: material.id,
      subjectId: typeof material.subject === 'object' ? material.subject._id : undefined,
      isBookmarked: !material.progress?.isBookmarked,
    }));
  }, [dispatch, material]);

  const handleMarkComplete = useCallback(() => {
    if (!material) return;
    const newState = !markedComplete;
    setMarkedComplete(newState);
    dispatch(updateMaterialProgress({
      materialId: material.id,
      subjectId: typeof material.subject === 'object' ? material.subject._id : undefined,
      isCompleted: newState,
      progress: newState ? 100 : 0,
    }));
  }, [dispatch, material, markedComplete]);

  return {
    material, loading, markedComplete,
    setMarkedComplete,
    handleBookmark, handleMarkComplete,
    ...purchase,
  };
};
