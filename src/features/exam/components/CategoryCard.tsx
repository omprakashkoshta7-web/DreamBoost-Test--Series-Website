import React from 'react';
import {
  ArrowRight, Atom, BookOpen, BriefcaseBusiness, Building2, Calculator, Code,
  Gavel, Globe, GraduationCap, Heart, Landmark, Leaf, Scale, School, Sparkles,
  Stethoscope, TrainFront,
} from '@shared/icons';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen, Calculator, Atom, Scale, Stethoscope, Landmark, Gavel,
  BriefcaseBusiness, Leaf, GraduationCap, School, Building2, TrainFront, Globe,
  Code, Heart, Sparkles,
};

const categoryGradients = [
  'from-blue-500 to-blue-700',
  'from-purple-500 to-purple-700',
  'from-green-500 to-green-700',
  'from-orange-500 to-orange-700',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
  'from-emerald-500 to-emerald-700',
  'from-indigo-500 to-indigo-700',
  'from-teal-500 to-teal-700',
  'from-pink-500 to-pink-700',
  'from-violet-500 to-violet-700',
  'from-amber-500 to-amber-700',
];

interface CategoryCardProps {
  category: any;
  index: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, onClick }) => {
  const IconComponent = iconMap[category.icon] || BookOpen;
  const gradient = categoryGradients[index % categoryGradients.length];

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-tb-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="p-6">
        {category.image ? (
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-tb-blue shadow-md border border-blue-200 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <img src={category.image} alt={category.name} className="w-full h-full object-contain p-2" />
          </div>
        ) : (
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
            <IconComponent className="w-7 h-7" />
          </div>
        )}

        <h3 className="text-lg font-bold text-tb-navy mt-4 group-hover:text-tb-blue transition-colors">
          {category.name}
        </h3>

        <p className="text-sm text-tb-gray-500 line-clamp-2 mt-2">
          {category.description}
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-tb-gray-100">
          <span className="text-xs text-tb-gray-400">
            {category.examCount ?? category.totalExams ?? 0} exams
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-tb-blue opacity-0 group-hover:opacity-100 transition-opacity">
            View Exams <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
