import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import {
  BookOpen, Calculator, Atom, Scale, Stethoscope, Landmark, Gavel, BriefcaseBusiness,
  Leaf, GraduationCap, School, Building2, TrainFront, Globe, Code, Heart,
  ArrowRight, Sparkles, Search, X,
} from '@shared/icons';
import SearchBar from '@features/exam/components/SearchBar';
import CategoryCard from '@features/exam/components/CategoryCard';
import CategoryEmptyState from '@features/exam/components/CategoryEmptyState';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen, Calculator, Atom, Scale, Stethoscope, Landmark, Gavel, BriefcaseBusiness,
  Leaf, GraduationCap, School, Building2, TrainFront, Globe, Code, Heart, Sparkles,
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

const ExamCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, fetchCategories } = useExam();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filtered = categories.filter((c: any) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading categories..." /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {filtered.length === 0 ? (
        <CategoryEmptyState query={searchQuery} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((category: any, index: number) => (
            <CategoryCard key={category._id || category.slug} category={category} index={index} onClick={() => navigate(`/app/exam-categories/${category.slug}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamCategoryPage;
