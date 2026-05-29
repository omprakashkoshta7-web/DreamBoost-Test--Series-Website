import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import {
  ArrowLeft, BookOpen, Layers, Zap, Target, ChevronRight,
  Atom, Calculator, Stethoscope, Landmark, Building2, GraduationCap,
  BriefcaseBusiness, Rocket, Shield, TrainFront, Trophy, FileText,
} from '@shared/icons';
import ExamCard from '@features/exam/components/ExamCard';
import ExamSelectHeader from '@features/exam/components/ExamSelectHeader';
import DifficultyBadge from '@features/exam/components/DifficultyBadge';
import ExamEmptyState from '@features/exam/components/ExamEmptyState';
import ClassSelectionModal from '@features/exam/components/ClassSelectionModal';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen, Layers, Target, Zap, Atom, Calculator, Stethoscope,
  Landmark, Building2, GraduationCap, BriefcaseBusiness, Rocket,
  Shield, TrainFront, Trophy, FileText,
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
