import React from 'react';
import { Card } from '@shared/components';
import { BarChart3, PieChart, Activity } from '@shared/icons';

interface PerformanceSummaryProps {
  accuracy?: number;
  avgSpeed?: number;
  consistency?: number;
  subjectPerformance?: any[];
}

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ accuracy, avgSpeed, consistency, subjectPerformance }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-tb-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-tb-blue" />
            </div>
            <div>
              <h3 className="text-base font-bold text-tb-navy">Performance Summary</h3>
              <p className="text-xs text-tb-gray-500">Your overall progress</p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-5">
          {[
            { label: 'Accuracy', value: accuracy || 0, color: 'bg-tb-blue' },
            { label: 'Speed (Qs/min)', value: Math.min(100, (avgSpeed || 0) * 50), display: avgSpeed || 0, color: 'bg-tb-green' },
            { label: 'Consistency', value: consistency || 0, color: 'bg-tb-orange' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-tb-gray-600">{item.label}</span>
                <span className="text-sm font-bold text-tb-navy">{item.display || item.value}%</span>
              </div>
              <div className="w-full bg-tb-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-5 border-b border-tb-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-tb-navy">Subject-wise Performance</h3>
              <p className="text-xs text-tb-gray-500">Breakdown by topic</p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          {subjectPerformance && subjectPerformance.length > 0 ? (
            subjectPerformance.map((subject) => {
              const color = subject.score >= 70 ? 'bg-tb-green' : subject.score >= 50 ? 'bg-tb-orange' : 'bg-tb-red';
              return (
                <div key={subject.subject}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-tb-gray-600">{subject.subject}</span>
                    <span className="text-sm font-bold text-tb-navy">{subject.score}%</span>
                  </div>
                  <div className="w-full bg-tb-gray-100 rounded-full h-2 overflow-hidden">
                    <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${subject.score}%` }} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Activity className="w-10 h-10 text-tb-gray-300 mx-auto mb-3" />
              <p className="text-sm text-tb-gray-500">Complete tests to see subject-wise performance</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PerformanceSummary;
