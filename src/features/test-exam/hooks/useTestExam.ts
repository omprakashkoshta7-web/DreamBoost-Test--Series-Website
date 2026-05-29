import { useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectCurrentTest, selectTestLoading, selectTestError } from '../../test-series/store/test.selectors';
import { fetchTest as fetchTestThunk, submitTest as submitTestThunk } from '../../test-series/store/test.thunks';
import { startTimer, resetTimer } from '../../test-series/store/timer.slice';

export const useTestExam = () => {
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector(selectCurrentTest);
  const loading = useAppSelector(selectTestLoading);
  const error = useAppSelector(selectTestError);
  const timeRemaining = useAppSelector(state => state.timer.timeRemaining);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const testIdRef = useRef<string>('');

  const questions = useMemo(() => currentTest?.questions || [], [currentTest]);

  const startTest = useCallback((testId: string, duration?: number) => {
    testIdRef.current = testId;
    dispatch(resetTimer());
    setAnswers({});
    dispatch(fetchTestThunk(testId));
    if (duration) dispatch(startTimer(duration));
  }, [dispatch]);

  const submitAnswer = useCallback((questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const submitTest = useCallback((testId: string, timeTaken: number, startedAt: string, completedAt: string, finalAnswers?: Record<string, number>) => {
    return dispatch(submitTestThunk({ testId, answers: finalAnswers || answers, timeTaken, startedAt, completedAt }));
  }, [dispatch, answers]);

  const refresh = useCallback(() => {
    if (testIdRef.current) dispatch(fetchTestThunk(testIdRef.current));
  }, [dispatch]);

  return { currentTest, questions, timeRemaining, loading, error, startTest, submitAnswer, submitTest, refresh };
};
