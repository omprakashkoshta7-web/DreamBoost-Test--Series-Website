import { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectTestResult, selectTestResultLoading, selectTestResultError } from '../store/result.selectors';
import { fetchTestResult as fetchTestResultThunk } from '../store/result.thunks';

export const useTestResult = () => {
  const dispatch = useAppDispatch();
  const result = useAppSelector(selectTestResult);
  const loading = useAppSelector(selectTestResultLoading);
  const error = useAppSelector(selectTestResultError);

  const resultIdRef = useRef<string | null>(null);

  const questions = useMemo(() => result?.questionReviews || [], [result]);
  const score = useMemo(() => result
    ? {
        score: result.score,
        totalMarks: result.totalMarks,
        correctAnswers: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        accuracy: result.accuracy,
      }
    : null, [result]);

  const fetchResult = useCallback((resultId: string) => {
    resultIdRef.current = resultId;
    dispatch(fetchTestResultThunk(resultId));
  }, [dispatch]);

  const refresh = useCallback(() => {
    if (resultIdRef.current) dispatch(fetchTestResultThunk(resultIdRef.current));
  }, [dispatch]);

  return { result, questions, score, loading, error, fetchResult, refresh };
};
