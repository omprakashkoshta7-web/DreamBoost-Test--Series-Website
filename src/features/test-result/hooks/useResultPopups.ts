import { useState, useEffect } from 'react';

export const useResultPopups = (result: any) => {
  const [showUpsell, setShowUpsell] = useState(false);
  const [showStreakPopup, setShowStreakPopup] = useState(false);

  useEffect(() => {
    if (result?.hasPremiumInCategory && !showStreakPopup) {
      const timer = setTimeout(() => setShowUpsell(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [result, showStreakPopup]);

  useEffect(() => {
    if (!result?.streak?.awarded || !result._id) return;
    const storageKey = `streak_popup_seen_${result._id}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, '1');
    const timer = setTimeout(() => setShowStreakPopup(true), 500);
    return () => clearTimeout(timer);
  }, [result]);

  return { showUpsell, showStreakPopup, setShowUpsell, setShowStreakPopup };
};
