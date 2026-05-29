import React from 'react';
import { Card, Button } from '@shared/components';
import { Sparkles, Zap, AlertTriangle, ArrowRight } from '@shared/icons';

interface RecommendedForYouProps {
  weakTopics: string[];
  todayTest: { _id: string; name: string; duration: number }[];
  suggestedMock: { _id: string; name: string; duration: number; difficulty: string }[];
  pendingRevision: { subject: string; score: number }[];
  onStartTest: (id: string) => void;
  onPracticeTopic: (topic: string) => void;
  onStartMock: (id: string) => void;
  onRevision: () => void;
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({
  weakTopics,
  todayTest,
  suggestedMock,
  pendingRevision,
  onStartTest,
  onPracticeTopic,
  onStartMock,
}) => {
  if (!weakTopics.length && !todayTest.length && !suggestedMock.length && !pendingRevision.length) return null;

  return (
    <Card title="Recommended for You">
      <div className="space-y-3 mt-3">
        {weakTopics.length > 0 && (
          <button
            onClick={() => onPracticeTopic?.(weakTopics[0])}
            className="w-full flex items-center justify-between gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-tb-orange" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-semibold text-tb-navy">Weak Topics Need Practice</p>
                <p className="text-xs text-tb-gray-500 truncate">
                  {weakTopics.slice(0, 3).join(', ')}
                  {weakTopics.length > 3 && ` +${weakTopics.length - 3} more`}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-tb-gray-400 flex-shrink-0" />
          </button>
        )}

        {todayTest.map((t) => (
          <button
            key={t._id}
            onClick={() => onStartTest(t._id)}
            className="w-full flex items-center justify-between gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-tb-blue" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-semibold text-tb-navy">Today's Test</p>
                <p className="text-xs text-tb-gray-500 truncate">{t.name} - {t.duration} min</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-tb-gray-400 flex-shrink-0" />
          </button>
        ))}

        {suggestedMock.map((m) => (
          <div
            key={m._id}
            role="button"
            tabIndex={0}
            onClick={() => onStartMock(m._id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStartMock(m._id);
              }
            }}
            className="w-full flex items-center justify-between gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-semibold text-tb-navy">Suggested Mock</p>
                <p className="text-xs text-tb-gray-500 truncate">{m.name} - {m.difficulty}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onStartMock(m._id);
              }}
            >
              Start
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedForYou;
