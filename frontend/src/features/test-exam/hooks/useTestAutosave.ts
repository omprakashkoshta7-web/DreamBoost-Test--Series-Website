import { useEffect, useCallback, useRef, useState } from 'react';

const STORAGE_KEY_PREFIX = 'test_answers_';
const AUTOSAVE_INTERVAL = 30000;

export const useTestAutosave = (testId: string | undefined, answers: Record<string, number>, flagged: Set<number>, currentQuestion: number, activeSectionIdx?: number) => {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isInitialLoad = useRef(true);

  const saveProgress = useCallback(() => {
    if (!testId) return;
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY_PREFIX + testId, JSON.stringify({ answers, flagged: Array.from(flagged), currentQuestion, activeSectionIdx }));
    setLastSavedAt(new Date());
    window.setTimeout(() => setIsSaving(false), 350);
  }, [testId, answers, flagged, currentQuestion, activeSectionIdx]);

  useEffect(() => {
    if (!testId) return;
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    const interval = setInterval(saveProgress, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [testId, saveProgress]);

  const loadSaved = useCallback(() => {
    if (!testId) return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + testId);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  }, [testId]);

  const clearSaved = useCallback(() => {
    if (testId) localStorage.removeItem(STORAGE_KEY_PREFIX + testId);
  }, [testId]);

  return { lastSavedAt, isSaving, saveProgress, loadSaved, clearSaved };
};
