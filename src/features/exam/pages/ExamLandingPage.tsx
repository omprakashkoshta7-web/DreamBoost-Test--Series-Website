import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useExam } from '../hooks';
import { fetchCompletedCategories } from '@features/test-series/store/test.thunks';
import { selectCompletedCategories } from '@features/test-series/store/test.selectors';
import { enrollTest, fetchMyEnrollments } from '@features/test-series/services/api';
import { useToast } from '@shared/components/ToastProvider';
import { FileText } from '@shared/icons';
import { Loader } from '@shared/components';
import TestCard from '@features/test-series/components/TestCard';
import EnrollModal from '@features/test-series/components/EnrollModal';
import SEO from '@shared/components/SEO';
import ExamLandingHeader from '@features/exam/components/ExamLandingHeader';
import AvailableTestsHeader from '@features/exam/components/AvailableTestsHeader';

const testTypeTabs = [
  { key: '', label: 'All Tests' },
  { key: 'subject', label: 'Subject Wise' },
  { key: 'chapter', label: 'Chapter Wise' },
  { key: 'full', label: 'Full Length' },
];

const ExamLandingPage: React.FC = () => {
  const { examSlug } = useParams<{ examSlug: string }>();
  const [searchParams] = useSearchParams();
  const selectedClass = searchParams.get('class') || '';
  const selectedSubCategory = searchParams.get('subCategory') || '';
  const [selectedTestType, setSelectedTestType] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentExam, loading, selectExam } = useExam();
  const completedCategories = useAppSelector(selectCompletedCategories);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrollingTest, setEnrollingTest] = useState<any | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    if (examSlug) selectExam(examSlug, selectedClass || undefined, selectedSubCategory || undefined);
    dispatch(fetchCompletedCategories());
  }, [selectExam, examSlug, selectedClass, selectedSubCategory, dispatch]);

  useEffect(() => {
    fetchMyEnrollments().then(setEnrolledIds).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleEnrollClick = useCallback((test: any) => {
    if (test) setEnrollingTest(test);
  }, []);

  const handleGoToSeries = useCallback((test: any) => {
    if (!test?._id || !examSlug) return;
    navigate(`/app/series/${examSlug}/${test._id}`);
  }, [examSlug, navigate]);

  const handleEnrollConfirm = useCallback(async () => {
    if (!enrollingTest) return;
    setEnrolling(true);
    try {
      await enrollTest(enrollingTest._id);
      setEnrolledIds(prev => [...prev, enrollingTest._id]);
      setEnrollingTest(null);
      showToast(`Successfully enrolled in "${enrollingTest.name}"!`, 'success');
      setTimeout(() => navigate(`/app/test-instructions/${enrollingTest._id}`), 1200);
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Failed to enroll. Please try again.', 'error');
    }
    setEnrolling(false);
  }, [enrollingTest, navigate, showToast]);

  const filteredTests = useMemo(() => {
    if (!currentExam) return [];
    const tests = currentExam.tests || [];
    let result = tests;
    if (selectedClass) {
      result = result.filter((t: any) => !t.class || t.class === 'all' || t.class === selectedClass);
    }
    if (selectedSubCategory) {
      result = result.filter((t: any) => !t.subCategory || t.subCategory === selectedSubCategory);
    }
    if (selectedTestType) {
      result = result.filter((t: any) => t.testType === selectedTestType);
    }
    return result;
  }, [currentExam, selectedClass, selectedSubCategory, selectedTestType]);

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading exam details..." /></div>;
  }

  const exam = currentExam;

  const pageTitle = selectedSubCategory ? `${exam.name} - ${selectedSubCategory}` : exam.name;
  const pageDesc = selectedSubCategory ? `${exam.name} ${selectedSubCategory} preparation` : exam.description;

  return (
    <div className="space-y-6 animate-fade-in">
      <SEO noIndex />
      <ExamLandingHeader name={pageTitle} description={pageDesc} onBack={() => navigate(-1)} />

      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <AvailableTestsHeader />
          <div className="flex items-center gap-2 flex-wrap">
            {selectedClass && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Class:</span>
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {['11', '12'].map((c) => (
                    <button
                      key={c}
                      onClick={() => navigate(`/app/exam-landing/${examSlug}?class=${c}`, { replace: true })}
                      className={`px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                        selectedClass === c
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Class {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Type:</span>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {testTypeTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTestType(tab.key)}
                    className={`px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                      selectedTestType === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test: any) => (
              <TestCard
                key={test._id}
                test={test}
                completedCategories={completedCategories}
                isEnrolled={enrolledIds.includes(test._id)}
                currentTime={currentTime}
                onEnroll={handleEnrollClick}
                primaryLabel="Go to Series"
                onPrimaryClick={handleGoToSeries}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No tests available</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tests for {pageTitle} will be added soon.</p>
          </div>
        )}
      </div>

      {enrollingTest && (
        <EnrollModal test={enrollingTest} onClose={() => setEnrollingTest(null)} onConfirm={handleEnrollConfirm} loading={enrolling} />
      )}
    </div>
  );
};

export default ExamLandingPage;
