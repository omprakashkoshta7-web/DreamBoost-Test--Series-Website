import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchCategories as fetchCategoriesThunk,
  fetchCategoryExams,
  fetchExamDetail,
} from '../store/exam.slice';

export const useExam = () => {
  const dispatch = useAppDispatch();
  const { categories, categoryExams: exams, currentExam, loading, error } = useAppSelector((state) => (state as any).exam);

  const fetchCategories = useCallback(() => dispatch(fetchCategoriesThunk()), [dispatch]);
  const fetchExams = useCallback((slug: string) => dispatch(fetchCategoryExams(slug)), [dispatch]);
  const selectExam = useCallback((slug: string, classFilter?: string) => dispatch(fetchExamDetail({ slug, class: classFilter })), [dispatch]);
  const refresh = useCallback(() => dispatch(fetchCategoriesThunk()), [dispatch]);

  return { exams, categories, currentExam, loading, error, fetchExams, fetchCategories, selectExam, refresh };
};
