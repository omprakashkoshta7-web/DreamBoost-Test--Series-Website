import React from 'react';
import { Maximize } from '@shared/icons';

interface FullscreenWarningProps {
  fullscreenWarning: boolean;
  onEnterFullscreen: () => void;
}

const FullscreenWarning: React.FC<FullscreenWarningProps> = ({ fullscreenWarning, onEnterFullscreen }) => {
  if (!fullscreenWarning) return null;
  return (
    <div className="px-4 py-3 bg-blue-50 border-b border-blue-200 flex items-center justify-between gap-3">
      <div className="flex items-start gap-2 text-sm text-blue-800">
        <Maximize className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Fullscreen mode is required</p>
          <p className="text-xs text-blue-700">For a distraction-free test, please continue in fullscreen.</p>
        </div>
      </div>
      <button
        onClick={onEnterFullscreen}
        className="text-white font-semibold text-xs px-3 py-1.5 rounded-lg bg-tb-blue hover:bg-tb-blue-dark flex-shrink-0"
      >
        Enter Fullscreen
      </button>
    </div>
  );
};

export default FullscreenWarning;
