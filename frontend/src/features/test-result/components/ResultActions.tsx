import React from 'react';
import { Button } from '@shared/components';
import { RotateCcw, Printer, Trophy } from '@shared/icons';

interface ResultActionsProps {
  testId: string | undefined;
  onRetake: () => void;
  onPrint: () => void;
  onDashboard: () => void;
  onLeaderboard: () => void;
}

const ResultActions: React.FC<ResultActionsProps> = ({ testId, onRetake, onPrint, onDashboard, onLeaderboard }) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <Button variant="primary" fullWidth onClick={onRetake}><RotateCcw className="w-4 h-4" /> Retake Test</Button>
    <Button variant="secondary" fullWidth onClick={onPrint}><Printer className="w-4 h-4" /> Print Result</Button>
    <Button variant="secondary" fullWidth onClick={onDashboard}>Dashboard</Button>
    <Button variant="secondary" fullWidth onClick={onLeaderboard}><Trophy className="w-4 h-4" /> Leaderboard</Button>
  </div>
);

export default ResultActions;
