import React from 'react';
import { Card, Badge } from '@shared/components';
import { BookOpen, ChevronRight, Clock, Zap } from '@shared/icons';
import { useHomeSections } from '@features/home/hooks';

type NavigateHandler = (path: string) => void;

export const ExamCardsSection = ({
  title,
  icon,
  tests,
  actionLabel = 'Start',
  actionColor = 'text-tb-blue',
  showViewAll,
  onNavigate,
}: {
  title: string;
  icon: React.ReactNode;
  tests?: any[];
  actionLabel?: string;
  actionColor?: string;
  showViewAll?: boolean;
  onNavigate: NavigateHandler;
}) => {
  const { getDifficultyColor } = useHomeSections();
  if (!tests?.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">{icon}{title}</h2>
        {showViewAll && (
          <button onClick={() => onNavigate('/app/test-series')} className="text-sm text-tb-blue font-medium flex items-center gap-1 hover:text-tb-blue-dark transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tests.map((test: any, i: number) => (
          <div key={test._id || i} onClick={() => onNavigate(`/app/test-instructions/${test._id || test.testId}`)} className="cursor-pointer group">
            <Card className={`p-0 overflow-hidden hover:shadow-tb-md transition-all duration-300 hover:-translate-y-1 ${title === 'Free Tests' ? 'border border-green-100' : ''}`}>
              <div className={`h-1 ${title === 'Free Tests' ? 'bg-green-500' : test.difficulty === 'easy' ? 'bg-green-500' : test.difficulty === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-tb-blue truncate max-w-[60%]">
                    {test.category || 'General'}
                  </span>
                  {test.isPremium && title !== 'Free Tests' ? (
                    <span className="text-xs font-bold text-tb-orange flex items-center gap-1 flex-shrink-0">
                      <Zap className="w-3 h-3" /> Premium
                    </span>
                  ) : (
                    <Badge variant="success">Free</Badge>
                  )}
                </div>
                <h3 className="text-sm font-bold text-tb-navy mb-3 group-hover:text-tb-blue transition-colors line-clamp-2 min-h-[2.5rem]">
                  {test.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-tb-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> {test.totalQuestions || test.questionsCount || 0} Qs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {test.duration || 0} min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
                    {(test.difficulty || 'medium').charAt(0).toUpperCase() + (test.difficulty || 'medium').slice(1)}
                  </span>
                  <span className={`text-xs ${actionColor} font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {actionLabel} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamCardsSection;
