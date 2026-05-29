import React from 'react';

interface DifficultyBadgeProps {
  difficulty: string;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
      difficulty === 'easy' ? 'text-green-600 bg-green-50' :
      difficulty === 'medium' ? 'text-orange-600 bg-orange-50' :
      'text-red-600 bg-red-50'
    }`}>{difficulty}</span>
  );
};

export default DifficultyBadge;
