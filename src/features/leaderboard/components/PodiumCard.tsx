import React from 'react';
import { Star, BookOpen, Target, Flame, Crown } from '@shared/icons';
import { Badge } from '@shared/components';

interface PodiumCardProps {
  entry: any;
  position: number;
}

const sizes = ['w-20 h-20', 'w-16 h-16', 'w-16 h-16'];
const textSizes = ['text-2xl', 'text-xl', 'text-xl'];
const colors = ['from-amber-400 to-amber-600', 'from-gray-400 to-gray-600', 'from-amber-600 to-amber-800'];
const bgColors = ['bg-amber-500/10 border-amber-500/30', 'bg-gray-500/10 border-gray-500/30', 'bg-amber-600/10 border-amber-600/30'];

const PodiumCard: React.FC<PodiumCardProps> = ({ entry, position }) => {
  if (!entry) return null;

  const name = String(entry.name || 'Student');
  const avatar = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const rank = entry.rank || position + 1;
  const totalScore = entry.totalScore ?? 0;
  const testsCompleted = entry.testsCompleted ?? 0;
  const avgScore = entry.avgScore ?? 0;
  const streak = entry.streak ?? 0;

  return (
    <div className={`order-${position + 1}`}>
      <div className={`text-center p-5 rounded-xl border ${bgColors[position]} backdrop-blur-sm`}>
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className={`${sizes[position]} rounded-2xl bg-gradient-to-br ${colors[position]} flex items-center justify-center text-white ${textSizes[position]} font-bold shadow-lg ${position === 0 ? 'ring-4 ring-amber-400/30' : ''}`}>
              {avatar}
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
              {position === 0 ? <Crown className="w-4 h-4 text-amber-500" /> : <span className="text-xs font-bold text-tb-gray-500">#{rank}</span>}
            </div>
          </div>
        </div>
        <h3 className="font-bold text-white mb-1">{name}</h3>
        <Badge variant={position === 0 ? 'warning' : 'primary'} className="mb-3">{entry.exam || 'General'}</Badge>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-xl font-bold">{totalScore}</span>
          <span className="text-xs text-blue-200/60">pts</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-blue-200/60">
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {testsCompleted} tests</span>
          <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> {avgScore}%</span>
          <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> {streak}d</span>
        </div>
      </div>
    </div>
  );
};

export default PodiumCard;
