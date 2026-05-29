import React from 'react';
import { Button } from '@shared/components';
import { AlertCircle } from '@shared/icons';

interface TabSwitchWarningProps {
  tabWarning: boolean;
  tabSwitchCount: number;
  maxTabSwitches: number;
  onDismiss: () => void;
}

const TabSwitchWarning: React.FC<TabSwitchWarningProps> = ({ tabWarning, tabSwitchCount, maxTabSwitches, onDismiss }) => {
  if (!tabWarning) return null;
  return (
    <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
      <div className="flex items-start gap-2 text-sm text-amber-800">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Please stay on the test screen</p>
          <p className="text-xs text-amber-700">Tab switch detected {tabSwitchCount}/{maxTabSwitches}. One more switch will auto-submit your test.</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onDismiss}>Got it</Button>
    </div>
  );
};

export default TabSwitchWarning;
