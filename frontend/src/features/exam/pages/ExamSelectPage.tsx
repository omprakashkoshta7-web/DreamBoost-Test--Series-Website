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

const examTypeConfig = {
  national: {
    title: 'National Level Exams',
    subtitle: 'Competitive exams conducted at the national level for engineering admissions',
    icon: 'Trophy',
    gradient: 'from-blue-600 to-blue-800',
    bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  state: {
    title: 'State-Level Engineering Exams',
    subtitle: 'State-wise engineering entrance exams for engineering college admissions',
    icon: 'Building2',
    gradient: 'from-emerald-600 to-emerald-800',
    bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
    borderColor: 'border-emerald-200 dark:border-emerald-700',
  },
  competitive: {
    title: 'Other Competitive Exams',
    subtitle: 'Additional competitive entrance exams',
    icon: 'Rocket',
    gradient: 'from-purple-600 to-purple-800',
    bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
  },
};

const SectionHeader: React.FC<{ title: string; subtitle: string; icon: string; count: number; bgGradient: string; borderColor: string }> = ({ title, subtitle, icon, count, bgGradient, borderColor }) => {
  const IconComp = iconMap[icon] || GraduationCap;
  const gradientMap: Record<string, string> = {
    Trophy: 'from-blue-600 to-blue-800',
    Building2: 'from-emerald-600 to-emerald-800',
    Rocket: 'from-purple-600 to-purple-800',
  };

  return (
    <div className={`rounded-2xl border ${borderColor} ${bgGradient} p-6 mb-8 backdrop-blur-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientMap[icon] || 'from-blue-600 to-blue-800'} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-tb-navy dark:text-white">{title}</h2>
            <p className="text-sm text-tb-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 shadow-sm">
          <p className="text-sm font-semibold text-tb-navy dark:text-white">{count} {count === 1 ? 'exam' : 'exams'}</p>
        </div>
      </div>
    </div>
  );
};

const GroupedExamsSection: React.FC<{ exams: any[]; onExamClick: (exam: any) => void }> = ({ exams, onExamClick }) => {
  const grouped = useMemo(() => {
    const typeGroups = {
      national: exams.filter((e) => e.examType === 'national'),
      state: exams.filter((e) => e.examType === 'state'),
      competitive: exams.filter((e) => e.examType === 'competitive'),
      other: exams.filter((e) => !e.examType || (e.examType !== 'national' && e.examType !== 'state' && e.examType !== 'competitive')),
    };
    return typeGroups;
  }, [exams]);

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([type, typeExams]: [string, any[]]) => {
        if (typeExams.length === 0 || type === 'other') return null;
        const config = examTypeConfig[type as keyof typeof examTypeConfig];
        if (!config) return null;

        return (
          <div key={type}>
            <SectionHeader
              title={config.title}
              subtitle={config.subtitle}
              icon={config.icon}
              count={typeExams.length}
              bgGradient={config.bgGradient}
              borderColor={config.borderColor}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {typeExams.map((exam: any) => (
                <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => onExamClick(exam)} />
              ))}
            </div>
          </div>
        );
      })}

      {grouped.other.length > 0 && (
        <div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-tb-navy dark:text-white">Other Exams</h2>
                  <p className="text-sm text-tb-gray-600 dark:text-gray-300 mt-1">Additional exams in this category</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 shadow-sm">
                <p className="text-sm font-semibold text-tb-navy dark:text-white">{grouped.other.length} {grouped.other.length === 1 ? 'exam' : 'exams'}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grouped.other.map((exam: any) => (
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
