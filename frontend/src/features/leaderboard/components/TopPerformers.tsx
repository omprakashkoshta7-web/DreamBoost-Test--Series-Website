import React from 'react';
import { Star } from '@shared/icons';
import PodiumCard from './PodiumCard';

interface TopPerformersProps {
  entries: any[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ entries }) => {
  const topEntries = entries.filter(Boolean);
  if (topEntries.length === 0) return null;

  const order = [1, 0, 2];
  const orderedEntries = order
    .filter((pos) => topEntries[pos])
    .map((pos) => ({ entry: topEntries[pos], position: pos }));

  return (
    <div className="bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
      <div className="relative z-10">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Star className="w-5 h-5 text-amber-400" />Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orderedEntries.map(({ entry, position }) => (
            <PodiumCard key={entry.rank || entry.name || position} entry={entry} position={position} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
