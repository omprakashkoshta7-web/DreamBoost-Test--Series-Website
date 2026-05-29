import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useExam } from '../hooks';
import { fetchCompletedCategories } from '@features/test-series/store/test.thunks';
import { selectCompletedCategories } from '@features/test-series/store/test.selectors';
import { enrollTest, fetchMyEnrollments } from '@features/test-series/services/api';
import { useToast } from '@shared/components/ToastProvider';
import { Loader } from '@shared/components';
import TestCard from '@features/test-series/components/TestCard';
import EnrollModal from '@features/test-series/components/EnrollModal';
import ExamLandingHeader from '@features/exam/components/ExamLandingHeader';
import AvailableTestsHeader from '@features/exam/components/AvailableTestsHeader';

const ExamLandingPage: React.FC = () => {
  const { examSlug } = useParams<{ examSlug: string }>();
  const [searchParams] = useSearchParams();
  const selectedClass = searchParams.get('class') || '';
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
    if (examSlug) selectExam(examSlug, selectedClass || undefined);
    dispatch(fetchCompletedCategories());
  }, [selectExam, examSlug, selectedClass, dispatch]);

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
    if (!selectedClass) return tests;
    return tests.filter((t: any) => !t.class || t.class === 'all' || t.class === selectedClass);
  }, [currentExam, selectedClass]);

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading exam details..." /></div>;
  }

  const exam = currentExam;

  return (
    <div className="space-y-6 animate-fade-in">
      <ExamLandingHeader name={exam.name} description={exam.description} onBack={() => navigate(-1)} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <AvailableTestsHeader count={filteredTests.length} />
          {selectedClass && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Class:</span>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {['11', '12'].map((c) => (
                  <button
                    key={c}
                    onClick={() => navigate(`/app/exam-landing/${examSlug}?class=${c}`, { replace: true })}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
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
        </div>
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
      </div>

      {enrollingTest && (
        <EnrollModal test={enrollingTest} onClose={() => setEnrollingTest(null)} onConfirm={handleEnrollConfirm} loading={enrolling} />
      )}
    </div>
  );
};

export default ExamLandingPage;
