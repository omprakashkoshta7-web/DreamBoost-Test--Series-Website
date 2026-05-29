import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, ArrowRight } from '@shared/icons';

interface Activity {
  id: string;
  title: string;
  category: string;
  isCompleted: boolean;
  progress: number;
}

interface RecentActivityListProps {
  activities: Activity[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  const navigate = useNavigate();
  if (activities.length === 0) return null;
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-6">
      <h3 className="font-semibold text-tb-navy mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((a) => (
          <div
            key={a.id}
            onClick={() => navigate(`/app/study-material/view/${a.id}`)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-tb-gray-50 transition-all cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.isCompleted ? 'bg-green-50' : 'bg-tb-blue-light'}`}>
              {a.isCompleted ? <CheckCircle className="w-4 h-4 text-green-600" /> : <BookOpen className="w-4 h-4 text-tb-blue" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-tb-navy truncate">{a.title}</p>
              <p className="text-xs text-tb-gray-400 capitalize">{a.category} &bull; {a.isCompleted ? 'Completed' : `${a.progress}% done`}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-tb-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
