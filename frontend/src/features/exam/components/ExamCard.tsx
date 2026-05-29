import React from 'react';
import { BookOpen, Layers, Zap, ChevronRight } from '@shared/icons';
import DifficultyBadge from './DifficultyBadge';

interface ExamCardProps {
  exam: any;
  iconMap: Record<string, React.ComponentType<any>>;
  onClick: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, iconMap, onClick }) => {
  const IconComponent = iconMap[exam.icon] || BookOpen;
  const examLogo = exam.bannerUrl || exam.image || exam.imageUrl || exam.logoUrl || exam.thumbnail;
  return (
    <div onClick={onClick} className="group bg-white rounded-xl border border-tb-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-tb-blue flex items-center justify-center text-white overflow-hidden border border-blue-200 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              {examLogo ? (
                <img src={examLogo} alt={exam.name} className="w-full h-full object-contain p-2" />
              ) : (
                <IconComponent className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-tb-navy group-hover:text-tb-blue transition-colors">{exam.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-tb-gray-500 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> {exam.totalTests ?? exam.testCount ?? 0} tests
                </span>
                {exam.difficulty && <DifficultyBadge difficulty={exam.difficulty} />}
              </div>
            </div>
          </div>
          {exam.isPremium && (
            <span className="flex items-center gap-1 text-xs font-bold text-tb-orange bg-orange-50 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" /> Premium
            </span>
          )}
        </div>
        <p className="text-xs text-tb-gray-500 line-clamp-2 mb-3">{exam.description}</p>
        <div className="flex items-center justify-between">
          {exam.subjects?.length > 0 && (
            <span className="text-xs text-tb-gray-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> {exam.subjects.length} subjects
            </span>
          )}
          <span className="text-xs text-tb-blue font-medium flex items-center gap-1 ml-auto">
            View Tests <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
