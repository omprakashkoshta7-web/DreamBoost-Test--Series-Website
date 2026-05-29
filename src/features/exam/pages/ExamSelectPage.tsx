import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import {
  ArrowLeft, BookOpen, Layers, Zap, Target,
  Atom, Calculator, Stethoscope, Landmark, Building2, GraduationCap,
  BriefcaseBusiness, Rocket, Shield, TrainFront, Trophy, FileText, Sparkles,
} from '@shared/icons';
import ExamCard from '@features/exam/components/ExamCard';
import ExamSelectHeader from '@features/exam/components/ExamSelectHeader';
import ExamEmptyState from '@features/exam/components/ExamEmptyState';
import SubCategorySelectionModal from '@features/exam/components/SubCategorySelectionModal';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen, Layers, Target, Zap, Atom, Calculator, Stethoscope,
  Landmark, Building2, GraduationCap, BriefcaseBusiness, Rocket,
  Shield, TrainFront, Trophy, FileText, Sparkles,
};

const GroupedExamsSection: React.FC<{ exams: any[]; sections: any[]; onExamClick: (exam: any) => void }> = ({ exams, sections, onExamClick }) => {
  const grouped = useMemo(() => {
    const sectionMap: Record<string, any[]> = {};
    const unassigned: any[] = [];
    exams.forEach((e) => {
      const sid = typeof e.sectionId === 'object' ? e.sectionId?._id : e.sectionId;
      if (sid) {
        if (!sectionMap[sid]) sectionMap[sid] = [];
        sectionMap[sid].push(e);
      } else {
        unassigned.push(e);
      }
    });
    return { sectionMap, unassigned };
  }, [exams]);

  const gradientList = ['from-blue-600 to-blue-700', 'from-emerald-600 to-emerald-700', 'from-purple-600 to-purple-700', 'from-amber-600 to-amber-700', 'from-rose-600 to-rose-700', 'from-cyan-600 to-cyan-700'];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {sections.map((section, idx) => {
        const items = grouped.sectionMap[section._id];
        if (!items || items.length === 0) return null;
        const IconComp = iconMap[section.icon] || GraduationCap;
        const gradient = gradientList[idx % gradientList.length];
        return (
          <div key={section._id} className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
                <IconComp className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-tb-navy">{section.title}</h2>
            </div>
            <p className="text-sm text-tb-gray-500 mb-8">{section.subtitle}</p>
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
  const { exams: categoryExams, categories, sections, loading, fetchExams } = useExam();
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any | null>(null);

  const category = categories.find((c: any) => c.slug === categorySlug);

  useEffect(() => {
    if (categorySlug) fetchExams(categorySlug);
  }, [fetchExams, categorySlug]);

  const handleExamClick = (exam: any) => {
    if (exam.subCategories && exam.subCategories.length > 0) {
      setSelectedExam(exam);
      setSelectedSubCategory(exam);
    } else {
      navigate(`/app/exam-landing/${exam.slug}`);
    }
  };

  const handleSubCategorySelect = (subCategory: string) => {
    if (!selectedSubCategory) return;
    navigate(`/app/exam-landing/${selectedSubCategory.slug}`);
    setSelectedSubCategory(null);
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
        <ExamSelectHeader name={category?.name || ''} description={category?.description} onBack={() => navigate('/app/exam-categories')} />
      )}

      {categoryExams.length === 0 ? (
        <ExamEmptyState categoryName={category?.name || ''} />
      ) : sections && sections.length > 0 ? (
        <GroupedExamsSection exams={categoryExams} sections={sections} onExamClick={handleExamClick} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryExams.map((exam: any) => (
            <ExamCard key={exam._id || exam.slug} exam={exam} iconMap={iconMap} onClick={() => handleExamClick(exam)} />
          ))}
        </div>
      )}

      {selectedSubCategory && (
        <SubCategorySelectionModal
          examName={selectedSubCategory.name}
          subCategories={selectedSubCategory.subCategories}
          onSelect={handleSubCategorySelect}
          onClose={() => { setSelectedSubCategory(null); setSelectedExam(null); }}
        />
      )}
    </div>
  );
};

export default ExamSelectPage;
