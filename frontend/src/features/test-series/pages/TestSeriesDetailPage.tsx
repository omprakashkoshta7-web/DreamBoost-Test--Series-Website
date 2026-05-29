import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@shared/components';
import { ArrowLeft, BookOpen, Clock, FileText, HelpCircle, Layers, Users } from '@shared/icons';
import { useExam } from '@features/exam/hooks';
import { enrollTest, fetchMyEnrollments } from '../services/api';
import EnrollModal from '../components/EnrollModal';
import { useToast } from '@shared/components/ToastProvider';

type SectionKey = 'subject' | 'chapter' | 'full';

const sectionMeta: Record<SectionKey, { title: string; subtitle: string; icon: React.ElementType }> = {
  subject: { title: 'Subject Wise', subtitle: 'Subject ke basis par practice tests', icon: Layers },
  chapter: { title: 'Chapter Wise', subtitle: 'Chapter/topic focused tests', icon: FileText },
  full: { title: 'Full Length Test', subtitle: 'Complete mock test exam pattern ke saath', icon: BookOpen },
};

const getTestId = (test: any) => String(test?._id || test?.id || '');

const isFullLengthTest = (test: any) => {
  if (test?.testType === 'full') return true;
  const text = `${test?.name || ''} ${test?.title || ''} ${test?.description || ''}`.toLowerCase();
  return /full|mock|complete|premium|practice set/.test(text);
};

const isChapterTest = (test: any) => {
  if (test?.testType === 'chapter') return true;
  const text = `${test?.topic || ''} ${test?.chapter || ''} ${test?.name || ''}`.toLowerCase();
  return Boolean(test?.topic || test?.chapter || /chapter|topic/.test(text));
};

const buildSections = (tests: any[]) => {
  const full = tests.filter(isFullLengthTest);
  const chapter = tests.filter(isChapterTest);
  const subject = tests.filter((test) => test?.testType === 'subject' || (!test?.testType && Boolean(test.subject || test.category)));

  return {
    subject: subject.length ? subject : tests,
    chapter,
    full: full.length ? full : tests,
  };
};

const TestSeriesDetailPage: React.FC = () => {
  const { examSlug, testId } = useParams<{ examSlug: string; testId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentExam, loading, selectExam } = useExam();
  const [activeSection, setActiveSection] = useState<SectionKey>('subject');
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrollingTest, setEnrollingTest] = useState<any | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [activeSubject, setActiveSubject] = useState('All');
  const enrollingTestRef = useRef<any | null>(null);

  useEffect(() => {
    if (examSlug) selectExam(examSlug);
  }, [examSlug, selectExam]);

  useEffect(() => {
    fetchMyEnrollments().then(setEnrolledIds).catch(() => {});
  }, []);

  useEffect(() => {
    enrollingTestRef.current = enrollingTest;
  }, [enrollingTest]);

  const tests = useMemo(() => currentExam?.tests || [], [currentExam]);
  const selectedTest = useMemo(() => tests.find((test: any) => getTestId(test) === testId) || tests[0], [tests, testId]);
  const sections = useMemo(() => buildSections(tests), [tests]);
  const sectionCounts = useMemo(() => ({
    subject: sections.subject.length,
    chapter: sections.chapter.length,
    full: sections.full.length,
  }), [sections]);
  const activeItems = sections[activeSection] || [];
  const subjectFilters = useMemo(() => {
    const subjects = activeItems.map((item: any) => item.subject || item.category || 'General');
    return ['All', ...Array.from(new Set(subjects.map((subject) => String(subject))))];
  }, [activeItems]);
  const visibleItems = useMemo(() => (
    activeSubject === 'All'
      ? activeItems
      : activeItems.filter((item: any) => String(item.subject || item.category || 'General') === activeSubject)
  ), [activeItems, activeSubject]);

  const handleSectionChange = useCallback((key: SectionKey) => {
    setActiveSection(key);
    setActiveSubject('All');
  }, []);

  const startTest = useCallback((test: any) => {
    const target = test;
    const id = getTestId(target);
    if (!id) return;

    if (target.isPremium && !enrolledIds.includes(id)) {
      navigate('/app/payment');
      return;
    }

    if (enrolledIds.includes(id)) {
      navigate(`/app/test-instructions/${id}`);
      return;
    }

    setEnrollingTest(target);
  }, [enrolledIds, navigate]);

  const confirmEnrollment = useCallback(async () => {
    const test = enrollingTestRef.current;
    if (!test) return;
    const id = getTestId(test);
    setEnrolling(true);
    try {
      await enrollTest(id);
      setEnrolledIds((current) => [...current, id]);
      setEnrollingTest(null);
      showToast(`Successfully enrolled in "${test.name}"!`, 'success');
      setTimeout(() => navigate(`/app/test-instructions/${id}`), 800);
    } catch (error: any) {
      const message = error?.response?.data?.message || '';
      if (/already enrolled/i.test(message) && id) {
        setEnrolledIds((current) => current.includes(id) ? current : [...current, id]);
        setEnrollingTest(null);
        navigate(`/app/test-instructions/${id}`);
        return;
      }
      showToast(message || 'Failed to enroll. Please try again.', 'error');
    } finally {
      setEnrolling(false);
    }
  }, [navigate, showToast]);

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading series..." /></div>;
  }

  return (
    <div className="animate-fade-in px-1 py-3 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-6xl space-y-5">
        <button
          onClick={() => navigate(`/app/exam-landing/${examSlug}`)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-tb-gray-600 hover:text-tb-blue"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
            {selectedTest?.name || currentExam.name} All Tests ({tests.length})
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-tb-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm">Mock Tests</button>
            <button className="rounded-full border border-tb-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-tb-gray-600">PYPs</button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-none bg-white shadow-sm">
          <div className="flex min-w-max items-center">
            {(Object.keys(sectionMeta) as SectionKey[]).map((key) => {
              const meta = sectionMeta[key];
              const Icon = meta.icon;
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSectionChange(key)}
                  className={`relative flex min-w-[260px] items-center justify-center gap-2 px-6 py-5 text-sm font-medium transition-colors ${
                    isActive ? 'text-tb-blue' : 'text-tb-gray-600 hover:text-tb-blue'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{meta.title} ({sectionCounts[key]})</span>
                  {isActive && <span className="absolute bottom-0 left-6 right-6 h-1 rounded-t-full bg-tb-blue" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {subjectFilters.map((subject) => {
            const active = activeSubject === subject;
            return (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`shrink-0 rounded px-5 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-tb-blue text-white' : 'bg-transparent text-tb-gray-500 hover:bg-tb-gray-50 hover:text-tb-blue'
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>

        {visibleItems.length ? (
          <div className="space-y-5">
            {visibleItems.map((item: any, index: number) => {
              const source = item;
              const id = getTestId(source);
              const isEnrolled = enrolledIds.includes(id);
              const questionCount = Number(item.questionCount ?? source.questionCount ?? source.totalQuestions ?? 0);
              const marks = Number(source.totalPoints ?? source.marks ?? questionCount * Number(source.marksPerQuestion || 2));
              const duration = item.duration || source.duration || 0;
              return (
                <div key={item._id || id || index} className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-tb-gray-100">
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-black sm:text-lg">{item.name || source.name}</h3>
                        <span className="text-xs font-medium text-tb-gray-400">
                          {source.isPremium ? 'Premium' : isEnrolled ? 'Enrolled' : 'Free'}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-tb-gray-500">
                        <span className="inline-flex items-center gap-2"><HelpCircle className="h-4 w-4 text-tb-gray-400" />{questionCount} Questions</span>
                        <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-tb-gray-400" />{marks} Marks</span>
                        <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-tb-gray-400" />{duration} Mins</span>
                      </div>
                    </div>
                    <button
                      onClick={() => startTest(item)}
                      className="w-full rounded bg-tb-blue px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-tb-blue-dark sm:w-44"
                    >
                      Start Now
                    </button>
                  </div>
                  <div className="border-t border-tb-gray-100 bg-tb-gray-50 px-5 py-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-tb-blue">
                      <Users className="h-4 w-4 text-tb-gray-400" />
                      <span>{item.subject || source.subject || source.category || 'General'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-tb-gray-200 bg-white p-8 text-center text-sm text-tb-gray-500">
            Abhi is section mein tests add nahi hain.
          </div>
        )}
      </div>

      {enrollingTest && (
        <EnrollModal test={enrollingTest} onClose={() => setEnrollingTest(null)} onConfirm={confirmEnrollment} loading={enrolling} />
      )}
    </div>
  );
};

export default TestSeriesDetailPage;
