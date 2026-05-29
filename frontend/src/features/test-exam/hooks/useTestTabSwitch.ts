import { useState, useEffect, useRef, useCallback } from 'react';

const MAX_TAB_SWITCHES = 2;

export const useTestTabSwitch = (onMaxReached: () => void) => {
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [tabWarning, setTabWarning] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        countRef.current += 1;
        setTabSwitchCount(countRef.current);
        if (countRef.current >= MAX_TAB_SWITCHES) {
          setTabWarning(false);
          onMaxReached();
        } else {
          setTabWarning(true);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [onMaxReached]);

  return { tabSwitchCount, tabWarning, setTabWarning, maxTabSwitches: MAX_TAB_SWITCHES };
};
