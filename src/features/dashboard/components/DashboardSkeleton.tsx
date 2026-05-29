import React from 'react';

const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="bg-gradient-to-br from-tb-navy via-blue-900 to-indigo-900 rounded-2xl p-6 h-40" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-tb-gray-100 rounded-xl" />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-tb-gray-100 rounded-2xl" />)}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-40 bg-tb-gray-100 rounded-2xl" />)}
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
