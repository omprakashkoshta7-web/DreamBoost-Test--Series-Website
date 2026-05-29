import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import {
  ArrowLeft, BookOpen, Layers, Zap, Target, ChevronRight,
  Atom, Calculator, Stethoscope, Landmark, Building2, GraduationCap,
  BriefcaseBusiness, Rocket, Shield, TrainFront, Trophy, FileText, Sparkles,
} from '@shared/icons';
import ExamCard from '@features/exam/components/ExamCard';
import ExamSelectHeader from '@features/exam/components/ExamSelectHeader';
import DifficultyBadge from '@features/exam/components/DifficultyBadge';
import ExamEmptyState from '@features/exam/components/ExamEmptyState';
import ClassSelectionModal from '@features/exam/components/ClassSelectionModal';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen, Layers, Target, Zap, Atom, Calculator, Stethoscope,
  Landmark, Building2, GraduationCap, BriefcaseBusiness, Rocket,
  Shield, TrainFront, Trophy, FileText, Sparkles,
};

const nationalGroup = {
  title: 'National Level Exams',
  subtitle: 'Exams conducted at the national level for engineering admissions',
  icon: 'Trophy',
  gradient: 'from-blue-500 to-blue-700',
  match: (name: string) => {
    const n = name.toLowerCase();
    return n.includes('jee') || n.includes('bitsat') || n.includes('cuet');
  },
};

const stateGroup = {
  title: 'State-Level Engineering Exams',
  subtitle: 'Exams conducted by individual state governments for engineering admissions',
  icon: 'Building2',
  gradient: 'from-emerald-500 to-emerald-700',
  match: (name: string) => {
    const n = name.toLowerCase();
    return n.includes('mht cet') || n.includes('wbjee') || n.includes('kcet') ||
           n.includes('eapcet') || n.includes('eamcet') || n.includes('comedk');
  },
};

const examGroups = [nationalGroup, stateGroup];

const SectionHeader: React.FC<{ title: string; subtitle: string; icon: string; count: number }> = ({ title, subtitle, icon, count }) => {
  const IconComp = iconMap[icon] || GraduationCap;
  return (
    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-tb-gray-100">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm flex-shrink-0">
        <IconComp className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-tb-navy">{title}</h2>
        <p className="text-xs text-tb-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <span className="text-xs text-tb-gray-400 font-medium whitespace-nowrap mt-1">{count} exam{count !== 1 ? 's' : ''}</span>
    </div>
  );
};

const GroupedExamsSection: React.FC<{ exams: any[]; onExamClick: (exam: any) => void }> = ({ exams, onExamClick }) => {
  const grouped = useMemo(() => {
    const assigned = new Set<string>();
    const groups = examGroups.map((group) => {
      const matched = exams.filter((e) => {
        const match = group.match(e.name);
        if (match) assigned.add(e._id || e.slug);
        return match;
      });
      return { ...group, items: matched };
    });
    const unassigned = exams.filter((e) => !assigned.has(e._id || e.slug));
    return { groups, unassigned };
  }, [exams]);

  return (
    <div className="space-y-8">
      {grouped.groups.map((group) => {
        if (group.items.length === 0) return null;
        return (
          <div key={group.title}>
            <SectionHeader title={group.title} subtitle={group.subtitle} icon={group.icon} count={group.items.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((exam: any) => (
                <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => onExamClick(exam)} />
              ))}
            </div>
          </div>
        );
      })}
      {grouped.unassigned.length > 0 && (
        <div>
          {grouped.groups.some((g) => g.items.length > 0) && (
            <SectionHeader title="Other Exams" subtitle="Additional exams in this category" icon="BookOpen" count={grouped.unassigned.length} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped.unassigned.map((exam: any) => (
              <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => onExamClick(exam)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const ExamSelectPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const { exams: categoryExams, categories, loading, fetchExams } = useExam();
  const [selectedExam, setSelectedExam] = useState<any | null>(null);

  const category = categories.find((c: any) => c.slug === categorySlug);

  useEffect(() => {
    if (categorySlug) fetchExams(categorySlug);
  }, [fetchExams, categorySlug]);

  const handleClassSelect = (className: '11' | '12') => {
    if (!selectedExam) return;
    navigate(`/app/exam-landing/${selectedExam.slug}?class=${className}`);
    setSelectedExam(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading exams..." /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <ExamSelectHeader name={category?.name || 'Exam Category'} description={category?.description} onBack={() => navigate('/app/exam-categories')} />

      {categoryExams.length === 0 ? (
        <ExamEmptyState categoryName={category?.name || ''} />
      ) : categorySlug === 'engineering' ? (
        <GroupedExamsSection exams={categoryExams} onExamClick={(exam) => setSelectedExam(exam)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryExams.map((exam: any) => (
            <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => setSelectedExam(exam)} />
          ))}
        </div>
      )}

      {selectedExam && (
        <ClassSelectionModal
          examName={selectedExam.name}
          onSelect={handleClassSelect}
          onClose={() => setSelectedExam(null)}
        />
      )}
    </div>
  );
};

export default ExamSelectPage;
