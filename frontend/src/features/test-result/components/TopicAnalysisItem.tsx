import React from 'react';
import { Zap } from '@shared/icons';

interface TopicAnalysisItemProps {
  topic: string;
  data: { total: number; correct: number; wrong: number };
}

const TopicAnalysisItem: React.FC<TopicAnalysisItemProps> = ({ topic, data }) => {
  const ts = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
  const tc = ts >= 70 ? 'bg-tb-green' : ts >= 50 ? 'bg-tb-orange' : 'bg-tb-red';
  return (
    <div className="p-4 border border-tb-gray-200 rounded-xl">
      <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-bold text-tb-navy">{topic}</h4><div className="flex gap-3 text-xs"><span className="text-tb-green font-semibold">{data.correct} ✓</span><span className="text-tb-red font-semibold">{data.wrong} ✗</span></div></div>
      <div className="flex items-center gap-3"><div className="flex-1 bg-tb-gray-200 rounded-full h-3"><div className={`${tc} h-3 rounded-full transition-all`} style={{ width: `${ts}%` }} /></div><span className="text-sm font-bold text-tb-navy w-12 text-right">{ts}%</span></div>
      <p className="text-xs text-tb-gray-500 mt-2 flex items-center gap-1"><Zap className="w-3 h-3" />{ts >= 70 ? 'Strong area' : ts >= 50 ? 'Needs practice' : 'Weak area - Focus here'}</p>
    </div>
  );
};

export default TopicAnalysisItem;
