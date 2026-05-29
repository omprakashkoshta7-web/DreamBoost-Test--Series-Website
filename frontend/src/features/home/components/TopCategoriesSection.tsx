import React from 'react';
import { Card } from '@shared/components';
import { BookOpen, ChevronRight } from '@shared/icons';
import { useHomeSections } from '@features/home/hooks';

type NavigateHandler = (path: string) => void;

export const TopCategoriesSection = ({ categories, onNavigate }: { categories?: any[]; onNavigate: NavigateHandler }) => {
  const { getCategoryIcon } = useHomeSections();
  if (!categories?.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-tb-navy flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-tb-blue" />
          Top Exam Categories
        </h2>
        <button onClick={() => onNavigate('/app/exam-categories')} className="text-sm text-tb-blue font-medium flex items-center gap-1 hover:text-tb-blue-dark transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.slice(0, 8).map((cat: any, i: number) => {
          const Icon = getCategoryIcon(cat.slug || cat.name);
          return (
            <div key={cat._id || i} onClick={() => onNavigate(`/app/exam-categories/${cat.slug || cat._id}`)} className="cursor-pointer group">
              <Card className="hover:shadow-tb-md transition-all duration-300 hover:-translate-y-1 h-full p-5">
                <div className="flex flex-col items-center text-center gap-3">
                  {cat.image ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-200 bg-tb-blue shadow-sm">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-2" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-tb-blue-light rounded-xl flex items-center justify-center group-hover:bg-tb-blue group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-tb-blue group-hover:text-white transition-colors" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-tb-navy group-hover:text-tb-blue transition-colors">{cat.name}</h3>
                    {cat.description && <p className="text-xs text-tb-gray-500 mt-1 line-clamp-2">{cat.description}</p>}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategoriesSection;
