import { useMemo } from 'react';
import {
  Atom, BookOpen, BriefcaseBusiness, Building2, GraduationCap,
  Landmark, Shield, Stethoscope, TrainFront,
} from '@shared/icons';
import type { ComponentType } from 'react';

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === 'easy') return 'bg-green-100 text-green-700';
  if (difficulty === 'medium') return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

const getCategoryIcon = (slug: string): ComponentType<any> => {
  const s = slug?.toLowerCase() || '';
  if (s.includes('bank') || s.includes('ibps') || s.includes('sbi')) return Building2;
  if (s.includes('railway') || s.includes('rrb')) return TrainFront;
  if (s.includes('ssc') || s.includes('cgl') || s.includes('govt')) return Landmark;
  if (s.includes('defence') || s.includes('army') || s.includes('nda')) return Shield;
  if (s.includes('science') || s.includes('tech')) return Atom;
  if (s.includes('medical') || s.includes('nursing')) return Stethoscope;
  if (s.includes('teaching') || s.includes('ctet')) return GraduationCap;
  if (s.includes('engineer') || s.includes('gate') || s.includes('ese')) return BriefcaseBusiness;
  return BookOpen;
};

export const useHomeSections = () => {
  return useMemo(() => ({ getCategoryIcon, getDifficultyColor }), []);
};
