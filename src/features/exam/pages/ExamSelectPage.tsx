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

const groupConfig: Record<string, { title: string; subtitle: string; icon: string }> = {
  national: { title: 'National Level Exams', subtitle: 'Exams conducted at the national level for engineering admissions', icon: 'Trophy' },
  state: { title: 'State-Level Engineering Exams', subtitle: 'Exams conducted by individual state governments for engineering admissions', icon: 'Building2' },
};

const GroupedExamsSection: React.FC<{ exams: any[]; onExamClick: (exam: any) => void }> = ({ exams, onExamClick }) => {
  const grouped = useMemo(() => {
    const groups: Record<string, any[]> = { national: [], state: [] };
    const unassigned: any[] = [];
    exams.forEach((e) => {
      if (e.group === 'national') groups.national.push(e);
      else if (e.group === 'state') groups.state.push(e);
      else unassigned.push(e);
    });
    return { ...groups, unassigned };
  }, [exams]);

  const gradientMap: Record<string, string> = {
    Trophy: 'from-blue-600 to-blue-700',
    Building2: 'from-emerald-600 to-emerald-700',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {(['national', 'state'] as const).map((key) => {
        const items = grouped[key];
        if (items.length === 0) return null;
        const config = groupConfig[key];
        const IconComp = iconMap[config.icon] || GraduationCap;
        return (
          <div key={key} className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientMap[config.icon] || 'from-blue-600 to-blue-700'} flex items-center justify-center text-white shadow-sm`}>
                <IconComp className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-tb-navy">{config.title}</h2>
            </div>
            <p className="text-sm text-tb-gray-500 mb-8">{config.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((exam: any) => (
                <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => onExamClick(exam)} />
              ))}
            </div>
          </div>
        );
      })}
      {grouped.unassigned.length > 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-tb-navy mb-8">Other Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      {categorySlug === 'engineering' ? (
        <button onClick={() => navigate('/app/exam-categories')} className="inline-flex items-center gap-1.5 text-sm text-tb-gray-500 hover:text-tb-blue transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </button>
      ) : (
        <ExamSelectHeader name={category?.name || 'Exam Category'} description={category?.description} onBack={() => navigate('/app/exam-categories')} />
      )}

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
