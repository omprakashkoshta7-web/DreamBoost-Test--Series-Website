import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@shared/components';
import { Play, Clock, ArrowRight } from '@shared/icons';

interface ContinueTestProps {
  recentTests: any[];
}

const ContinueTest: React.FC<ContinueTestProps> = ({ recentTests }) => {
  const navigate = useNavigate();
  if (!recentTests || recentTests.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <Play className="w-5 h-5 text-tb-green" />
          Continue Test
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentTests.slice(0, 3).map((test: any, i: number) => (
          <Card key={i} className="p-5 hover:shadow-tb-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-tb-navy truncate">{test.name}</h3>
                <p className="text-xs text-tb-gray-500 mt-1">Score: {test.score}/{test.total}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <Clock className="w-5 h-5 text-tb-orange" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-tb-gray-500 mb-1.5">
                <span>Accuracy</span>
                <span className="font-semibold text-tb-navy">{test.accuracy}%</span>
              </div>
              <div className="w-full bg-tb-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-tb-orange h-2 rounded-full transition-all" style={{ width: `${test.accuracy}%` }} />
              </div>
            </div>
            <Button variant="orange" size="sm" fullWidth onClick={() => navigate('/app/test-series')} className="!bg-tb-orange hover:!bg-tb-orange-hover text-white">
              Retry Test <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContinueTest;
