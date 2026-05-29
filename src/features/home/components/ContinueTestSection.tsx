import React from 'react';
import { Button, Card } from '@shared/components';
import { ArrowRight, Clock, Play } from '@shared/icons';

type NavigateHandler = (path: string) => void;

export const ContinueTestSection = ({
  tests,
  onNavigate,
  onResume,
}: {
  tests?: any[];
  onNavigate: NavigateHandler;
  onResume: (id: string) => void;
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
        <Play className="w-5 h-5 text-tb-green" />
        Continue Test
      </h2>
    </div>
    {tests?.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test: any, i: number) => (
          <Card key={test._id || i} className="p-5 hover:shadow-tb-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-tb-navy truncate">{test.name}</h3>
                <p className="text-xs text-tb-gray-500 mt-1">{test.category || 'General'}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <Clock className="w-5 h-5 text-tb-orange" />
              </div>
            </div>
            {typeof test.progress === 'number' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-tb-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span className="font-semibold text-tb-navy">{test.progress}%</span>
                </div>
                <div className="w-full bg-tb-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-tb-orange h-2 rounded-full transition-all" style={{ width: `${test.progress}%` }} />
                </div>
              </div>
            )}
            <Button variant="orange" size="sm" fullWidth onClick={() => onResume(test._id || test.testId)} className="!bg-tb-orange hover:!bg-tb-orange-hover text-white">
              Resume Test <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    ) : (
      <Card className="p-6 text-center">
        <Play className="w-10 h-10 text-tb-gray-300 mx-auto mb-3" />
        <p className="text-sm text-tb-gray-500">No tests in progress</p>
        <button onClick={() => onNavigate('/app/test-series')} className="text-sm text-tb-blue font-medium mt-2 hover:text-tb-blue-dark transition-colors">
          Start a new test <ArrowRight className="w-4 h-4 inline" />
        </button>
      </Card>
    )}
  </div>
);

export default ContinueTestSection;
