import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubjectGridProps {
  subjects: any[];
}

const subjectColors: Record<string, string> = {
  mathematics: 'from-blue-500 to-blue-700', physics: 'from-purple-500 to-purple-700',
  chemistry: 'from-green-500 to-green-700', biology: 'from-emerald-500 to-emerald-700',
  english: 'from-orange-500 to-orange-700', history: 'from-rose-500 to-rose-700',
  reasoning: 'from-cyan-500 to-cyan-700', gk: 'from-yellow-500 to-yellow-700',
};

const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-bold text-tb-navy mb-4">Subjects</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {subjects.map((subject) => {
          const grad = subjectColors[subject.name.toLowerCase()] || 'from-tb-blue to-blue-600';
          return (
            <button key={subject.id} onClick={() => navigate(`/app/study-material/subject/${subject.id}`)} className="group text-left">
              <div className="bg-white rounded-xl border border-tb-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white text-lg shadow-sm`}>
                  {subject.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-tb-navy mt-3 text-sm group-hover:text-tb-blue transition-colors">{subject.name}</h3>
                <p className="text-xs text-tb-gray-400 mt-1">{subject.materialCount} materials</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectGrid;
