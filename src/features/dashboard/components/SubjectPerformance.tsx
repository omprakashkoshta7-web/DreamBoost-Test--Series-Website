import React from 'react';
import { Card, Badge } from '@shared/components';
import { TrendingUp, TrendingDown, Minus } from '@shared/icons';

interface SubjectPerformanceProps {
  subjects: { subject: string; score: number; weakTopics: string[]; improvement: number }[];
}

const SubjectPerformance: React.FC<SubjectPerformanceProps> = ({ subjects }) => {
  if (!subjects.length) return null;

  return (
    <Card title="Subject Performance">
      <div className="space-y-3 mt-3">
        {subjects.slice(0, 6).map((s, i) => (
          <div key={i} className="p-3 bg-tb-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-tb-navy">{s.subject}</span>
                <Badge variant={s.score >= 70 ? 'success' : s.score >= 40 ? 'warning' : 'danger'}>{s.score}%</Badge>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${s.improvement > 0 ? 'text-tb-green' : s.improvement < 0 ? 'text-tb-red' : 'text-tb-gray-400'}`}>
                {s.improvement > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : s.improvement < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                {s.improvement > 0 ? '+' : ''}{s.improvement}%
              </div>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden border border-tb-gray-200">
              <div className={`h-full rounded-full ${s.score >= 70 ? 'bg-tb-green' : s.score >= 40 ? 'bg-tb-orange' : 'bg-tb-red'}`}
                style={{ width: `${s.score}%` }} />
            </div>
            {s.weakTopics.length > 0 && (
              <p className="text-xs text-tb-gray-500 mt-1.5">Weak: {s.weakTopics.slice(0, 2).join(', ')}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SubjectPerformance;
