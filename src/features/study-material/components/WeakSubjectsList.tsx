import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from '@shared/icons';

interface WeakSubject {
  id: string;
  name: string;
  progress: number;
}

interface WeakSubjectsListProps {
  subjects: WeakSubject[];
}

const WeakSubjectsList: React.FC<WeakSubjectsListProps> = ({ subjects }) => {
  const navigate = useNavigate();
  if (subjects.length === 0) return null;
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-tb-orange" />
        <h3 className="font-semibold text-tb-navy">Subjects Needing Improvement</h3>
      </div>
      <div className="space-y-3">
        {subjects.map((s) => (
          <div key={s.id} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-tb-navy">{s.name}</span>
                <span className="text-sm font-medium text-tb-orange">{s.progress}%</span>
              </div>
              <div className="w-full h-2 bg-tb-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-tb-orange rounded-full" style={{ width: `${s.progress}%` }} />
              </div>
            </div>
            <button
              onClick={() => navigate(`/app/study-material/subject/${s.id}`)}
              className="p-2 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakSubjectsList;
