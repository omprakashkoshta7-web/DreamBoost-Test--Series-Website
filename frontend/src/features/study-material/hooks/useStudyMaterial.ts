import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { BookOpen, Edit, FileText, RefreshCw, Video } from '@shared/icons';
import {
  fetchChapters,
  fetchMaterials as fetchMaterialsThunk,
  fetchMyLibrary,
  fetchProfileProgress,
  fetchSubjects as fetchSubjectsThunk,
  updateMaterialProgress,
} from '../store/study-material.slice';

export const studyMaterialCategoryChips = [
  { key: '', label: 'All', icon: BookOpen },
  { key: 'notes', label: 'Notes', icon: FileText },
  { key: 'pdf', label: 'PDF', icon: FileText },
  { key: 'video', label: 'Videos', icon: Video },
  { key: 'pyq', label: 'PYQ', icon: FileText },
  { key: 'short-notes', label: 'Short Notes', icon: Edit },
  { key: 'revision', label: 'Revision', icon: RefreshCw },
];

export const libraryTabs = [
  { key: 'all', label: 'All' },
  { key: 'bookmarked', label: 'Bookmarked' },
  { key: 'completed', label: 'Completed' },
  { key: 'downloaded', label: 'Downloaded' },
  { key: 'history', label: 'History' },
];

export const useStudyMaterial = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(state => state.studyMaterial.subjects);
  const materials = useAppSelector(state => state.studyMaterial.materials);
  const loading = useAppSelector(state => state.studyMaterial.loading);
  const error = useAppSelector(state => state.studyMaterial.error);

  const fetchBySubject = useCallback((subjectId: string) => {
    dispatch(fetchMaterialsThunk({ subject: subjectId }));
  }, [dispatch]);

  const fetchMaterials = useCallback((params?: { subject?: string; category?: string; chapter?: string; search?: string; page?: number; limit?: number }) => {
    dispatch(fetchMaterialsThunk(params || {}));
  }, [dispatch]);

  const search = useCallback((searchTerm: string) => {
    dispatch(fetchMaterialsThunk({ search: searchTerm }));
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchSubjectsThunk());
    dispatch(fetchMaterialsThunk({}));
  }, [dispatch]);

  return { subjects, materials, loading, error, fetchBySubject, fetchMaterials, search, refresh };
};

export const useStudyMaterialPage = () => {
  const dispatch = useAppDispatch();
  const { subjects, materials, loading } = useAppSelector((state) => state.studyMaterial);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(fetchSubjectsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMaterialsThunk({ search, category: activeCategory || undefined, limit: 8 }));
  }, [activeCategory, dispatch, search]);

  const activeCategoryLabel = useMemo(() => (
    studyMaterialCategoryChips.find((chip) => chip.key === activeCategory)?.label || ''
  ), [activeCategory]);

  return {
    activeCategory,
    activeCategoryLabel,
    loading,
    materials,
    search,
    subjects,
    setActiveCategory,
    setSearch,
  };
};

export const useMyLibrary = () => {
  const dispatch = useAppDispatch();
  const { libraryItems, loading, libraryPagination } = useAppSelector((state) => state.studyMaterial);
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMyLibrary({ tab: activeTab, page, limit: 12 }));
  }, [activeTab, dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const handleRemoveBookmark = useCallback((_id: string, materialId: string) => {
    dispatch(updateMaterialProgress({ materialId, isBookmarked: false }));
    dispatch(fetchMyLibrary({ tab: activeTab, page, limit: 12 }));
  }, [activeTab, dispatch, page]);

  return {
    activeTab,
    libraryItems,
    libraryPagination,
    loading,
    page,
    handleRemoveBookmark,
    setActiveTab,
    setPage,
  };
};

export const useStudyProgress = () => {
  const dispatch = useAppDispatch();
  const { profileProgress: progress, loading } = useAppSelector((state) => state.studyMaterial);

  useEffect(() => {
    dispatch(fetchProfileProgress());
  }, [dispatch]);

  return { loading, progress };
};

export const useSubjectDetail = (subjectId?: string) => {
  const dispatch = useAppDispatch();
  const { subjects, materials, chapters, loading } = useAppSelector((state) => state.studyMaterial);
  const subject = useMemo(() => subjects.find((item) => item.id === subjectId), [subjectId, subjects]);

  useEffect(() => {
    if (subjects.length === 0) dispatch(fetchSubjectsThunk());
    if (subjectId) {
      dispatch(fetchMaterialsThunk({ subject: subjectId, limit: 50 }));
      dispatch(fetchChapters(subjectId));
    }
  }, [dispatch, subjectId, subjects.length]);

  return {
    chapters,
    loading,
    materials,
    subject,
  };
};
