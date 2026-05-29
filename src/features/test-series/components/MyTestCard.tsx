import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from '@shared/components';
import { AlertTriangle, BookOpen, Clock, Target, TrendingUp, BarChart3, ArrowRight, RotateCcw, ChevronRight } from '@shared/icons';

const DIFFICULTY_VARIANTS: Record<string, string> = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const ENDING_REMINDER_MS = 24 * ONE_HOUR_MS;

const formatCountdown = (msLeft: number) => {
  const totalSeconds = Math.max(0, Math.floor(msLeft / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
};

interface MyTestCardProps {
  test: any;
  currentTime: number;
  onNavigate: (id: string) => void;
}

const MyTestCard: React.FC<MyTestCardProps> = ({ test, currentTime, onNavigate }) => {
  const navigate = useNavigate();
  const result = test.lastResult;
  const accuracy = result ? Math.round(result.accuracy) : null;
  const activeUntil = test.activeUntil ? new Date(test.activeUntil) : null;
  const msLeft = activeUntil ? activeUntil.getTime() - currentTime : null;
  const isEndingSoon = msLeft !== null && msLeft > 0 && msLeft <= ENDING_REMINDER_MS;
  const endingCountdown = isEndingSoon && msLeft !== null ? formatCountdown(msLeft) : '';

  return (
    <div onClick={() => onNavigate(test._id)}
      className="bg-white rounded-xl border border-tb-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info">{test.category}</Badge>
            {test.subject && <span className="text-[11px] text-tb-gray-400 truncate">{test.subject}</span>}
          </div>
          <h3 className="text-sm font-bold text-tb-navy line-clamp-1">{test.name}</h3>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {test.isPremium && (
            <Badge variant="warning">PREMIUM</Badge>
          )}
          {!result && (
            <Badge variant="success">ENROLLED</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-tb-gray-500 mb-3">
        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {test.questionCount || test.totalQuestions || 0} Ques</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {test.duration} min</span>
        {test.difficulty && (
          <Badge variant={DIFFICULTY_VARIANTS[test.difficulty] as any || 'info'}>
            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
          </Badge>
        )}
      </div>

      {isEndingSoon && (
        <div className="mb-3 flex items-center justify-between gap-3 py-2 text-red-700">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-black uppercase tracking-wide">Ending soon</p>
            <p className="text-xs font-semibold text-red-700">Complete before it expires.</p>
          </div>
          <span className="font-mono text-lg font-black tabular-nums text-red-700">
            {endingCountdown}
          </span>
        </div>
      )}

      {result ? (
        <div className="bg-tb-gray-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-tb-gray-500 flex items-center gap-1"><Target className="w-3 h-3" /> Score</span>
            <span className="font-bold text-tb-navy">{result.score}/{result.totalMarks}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-tb-gray-500 flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Accuracy</span>
            <span className={`font-bold ${accuracy && accuracy >= 60 ? 'text-green-600' : accuracy && accuracy >= 40 ? 'text-orange-600' : 'text-red-600'}`}>{accuracy}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-tb-gray-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Status</span>
            <span className={`font-bold ${result.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>{result.status}</span>
          </div>
        </div>
      ) : (
        <div className="bg-tb-gray-50 rounded-xl p-3 text-center">
          <Clock className="w-5 h-5 text-tb-gray-300 mx-auto mb-1" />
          <p className="text-xs text-tb-gray-400">Not started yet</p>
        </div>
      )}

      <Button variant="primary" fullWidth size="sm" onClick={(e) => { e.stopPropagation(); onNavigate(test._id); }} className="mt-3">
        <RotateCcw className="w-3.5 h-3.5" /> {result ? 'Retake Test' : 'Start Test'}
      </Button>
    </div>
  );
};

export default MyTestCard;
