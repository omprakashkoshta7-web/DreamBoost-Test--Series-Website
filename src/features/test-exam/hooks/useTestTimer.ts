import { useState, useEffect, useCallback, useRef } from 'react';

export const useTestTimer = (initialDuration: number, isPaused: boolean, isActive: boolean) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [timeUp, setUp] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (initialDuration > 0) setTimeLeft(initialDuration);
  }, [initialDuration]);

  useEffect(() => {
    if (!isActive || isPaused || timeUp) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setUp(true);
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, isPaused, timeUp]);

  const reset = useCallback((duration: number) => {
    setTimeLeft(duration);
    setUp(false);
  }, []);

  return { timeLeft, timeUp, reset };
};
