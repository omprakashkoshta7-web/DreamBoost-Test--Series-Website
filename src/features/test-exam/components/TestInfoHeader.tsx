import React from 'react';
import { Card } from '@shared/components';
import { Clock } from '@shared/icons';

interface TestInfoHeaderProps {
  name: string;
  category?: string;
  subject?: string;
  difficulty?: string;
  isPremium?: boolean;
  totalQuestions: number;
  duration: number;
  totalMarks: number;
}

const TestInfoHeader: React.FC<TestInfoHeaderProps> = ({
  name,
  category,
  subject,
  difficulty,
  isPremium,
  totalQuestions,
  duration,
  totalMarks,
}) => (
  <Card className="border-l-4 border-l-tb-blue">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {category && <span className="px-2.5 py-1 rounded-full bg-blue-50 text-tb-blue text-xs font-semibold">{category}</span>}
          {subject && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-tb-gray-600 text-xs font-semibold">{subject}</span>}
          {difficulty && <span className="px-2.5 py-1 rounded-full bg-orange-50 text-tb-orange text-xs font-semibold capitalize">{difficulty}</span>}
          {isPremium && <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">Premium</span>}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-tb-navy">{name}</h1>
        <p className="text-sm text-tb-gray-500 mt-1">{totalQuestions} Questions - {totalMarks} Marks - Results after submission</p>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-tb-gray-600">
          <Clock className="w-4 h-4" />
          <span>{duration} min</span>
        </div>
        <div className="px-3 py-1 bg-tb-green-bg text-tb-green text-xs font-semibold rounded-full">{totalMarks} Marks</div>
      </div>
    </div>
  </Card>
);

export default TestInfoHeader;
