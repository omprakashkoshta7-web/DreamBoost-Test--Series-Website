import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import { ArrowLeft, Zap, Layers, BookOpen } from '@shared/icons';

const testTypes = [
  {
    key: 'full',
    title: 'Full Length Tests',
    description: 'Complete mock tests covering all subjects',
    icon: Zap,
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
  },
  {
    key: 'subject',
    title: 'Subject-wise Tests',
    description: 'Practice tests subject by subject',
    icon: Layers,
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
  },
  {
    key: 'chapter',
    title: 'Chapter-wise Tests',
    description: 'Focused tests on individual chapters',
    icon: BookOpen,
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
  },
];

const TestTypeSelectPage: React.FC = () => {
  const { examSlug } = useParams<{ examSlug: string }>();
  const navigate = useNavigate();
  const { currentExam, loading, selectExam } = useExam();

  useEffect(() => {
    if (examSlug) selectExam(examSlug);
  }, [selectExam, examSlug]);

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading..." /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-tb-gray-500 hover:text-tb-blue transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-tb-navy dark:text-white">{currentExam.name}</h1>
        <p className="text-tb-gray-500 dark:text-gray-400 mt-1">Choose test type to start practicing</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {testTypes.map((type) => {
          const Icon = type.icon;
          const count = (currentExam.tests || []).filter((t: any) => t.testType === type.key).length;
          return (
            <button
              key={type.key}
              onClick={() => navigate(`/app/exam-landing/${examSlug}/${type.key}`)}
              className={`group relative p-6 rounded-2xl border-2 ${type.border} ${type.bg} ${type.hoverBorder} transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-left`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-tb-navy dark:text-white mb-1">{type.title}</h3>
              <p className="text-sm text-tb-gray-500 dark:text-gray-400">{type.description}</p>
              <p className="text-xs text-tb-gray-400 mt-2 font-medium">{count} test{count !== 1 ? 's' : ''} available</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TestTypeSelectPage;
