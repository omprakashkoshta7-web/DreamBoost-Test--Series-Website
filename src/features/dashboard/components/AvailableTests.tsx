import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '@shared/components';
import { BookOpen, Clock, ChevronRight, Zap } from '@shared/icons';

interface AvailableTestsProps {
  tests: any[];
}

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === 'easy') return 'bg-green-100 text-green-700';
  if (difficulty === 'medium') return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

const AvailableTests: React.FC<AvailableTestsProps> = ({ tests }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-tb-blue" />
          Available Test Series
        </h2>
        <button onClick={() => navigate('/app/test-series')} className="text-sm text-tb-blue font-medium flex items-center gap-1 hover:text-tb-blue-dark transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tests.slice(0, 4).map((test) => (
          <div key={test._id} onClick={() => navigate(`/app/test-instructions/${test._id}`)} className="cursor-pointer group">
            <Card className="p-0 overflow-hidden hover:shadow-tb-md transition-all duration-300 hover:-translate-y-1">
              <div className={`h-1 ${test.difficulty === 'easy' ? 'bg-green-500' : test.difficulty === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-tb-blue">{test.category}</span>
                  {test.isPremium ? (
                    <span className="text-xs font-bold text-tb-orange flex items-center gap-1"><Zap className="w-3 h-3" /> Premium</span>
                  ) : <Badge variant="success">Free</Badge>}
                </div>
                <h3 className="text-sm font-bold text-tb-navy mb-3 group-hover:text-tb-blue transition-colors line-clamp-2 min-h-[2.5rem]">{test.name}</h3>
                <div className="flex items-center gap-4 text-xs text-tb-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {test.totalQuestions} Qs</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {test.duration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-tb-blue font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Start <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
        {tests.length === 0 && (
          <div className="col-span-full text-center py-12 text-tb-gray-500">
            <BookOpen className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
            <p>No tests available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTests;
