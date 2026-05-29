import { useState, useEffect, useCallback } from 'react';

export const useTestFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      const nextFullscreen = !!document.fullscreenElement;
      setIsFullscreen(nextFullscreen);
      if (!nextFullscreen) setFullscreenWarning(true);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen().then(() => setFullscreenWarning(false)).catch(() => {});
  }, []);

  return { isFullscreen, fullscreenWarning, setFullscreenWarning, enterFullscreen };
};
