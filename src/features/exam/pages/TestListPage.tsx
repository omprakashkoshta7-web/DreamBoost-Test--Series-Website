import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader } from '@shared/components';
import { ArrowLeft, Clock, HelpCircle, ChevronRight } from '@shared/icons';

const TestListPage: React.FC = () => {
  const { examSlug, testType } = useParams<{ examSlug: string; testType: string }>();
  const navigate = useNavigate();
  const { currentExam, loading, selectExam } = useExam();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  useEffect(() => {
    if (examSlug) selectExam(examSlug);
  }, [selectExam, examSlug]);

  const allTests = currentExam?.tests || [];

  const tests = useMemo(() => {
    return allTests.filter((t: any) => t.testType === testType);
  }, [allTests, testType]);

  const subjects = useMemo(() => {
    const map = new Map<string, any[]>();
    tests.forEach((t: any) => {
      const sub = t.subject || 'General';
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(t);
    });
    return Array.from(map.entries()).map(([name, tests]) => ({ name, tests }));
  }, [tests]);

  const chapters = useMemo(() => {
    if (!selectedSubject) return [];
    const subjectTests = tests.filter((t: any) => (t.subject || 'General') === selectedSubject);
    const map = new Map<string, any[]>();
    subjectTests.forEach((t: any) => {
      const ch = t.chapter || 'General';
      if (!map.has(ch)) map.set(ch, []);
      map.get(ch)!.push(t);
    });
    return Array.from(map.entries()).map(([name, tests]) => ({ name, tests }));
  }, [tests, selectedSubject]);

  const filteredTests = useMemo(() => {
    if (testType === 'full') return tests;
    if (testType === 'subject' && selectedSubject) {
      return tests.filter((t: any) => (t.subject || 'General') === selectedSubject);
    }
    if (testType === 'chapter' && selectedSubject && selectedChapter) {
      return tests.filter((t: any) => (t.subject || 'General') === selectedSubject && (t.chapter || 'General') === selectedChapter);
    }
    return [];
  }, [tests, testType, selectedSubject, selectedChapter]);

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading tests..." /></div>;
  }

  const typeLabel = testType === 'full' ? 'Full Length' : testType === 'subject' ? 'Subject-wise' : 'Chapter-wise';

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-tb-gray-500 hover:text-tb-blue transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-tb-navy dark:text-white">{currentExam.name}</h1>
        <p className="text-tb-gray-500 dark:text-gray-400 mt-1">{typeLabel} Tests</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-tb-gray-500 flex-wrap">
        <span>{currentExam.name}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-tb-navy dark:text-white font-medium">{typeLabel}</span>
        {selectedSubject && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-tb-navy dark:text-white font-medium">{selectedSubject}</span>
          </>
        )}
        {selectedChapter && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-tb-navy dark:text-white font-medium">{selectedChapter}</span>
          </>
        )}
      </div>

      {/* FULL LENGTH — Direct test list */}
      {testType === 'full' && (
        <TestGrid tests={tests} onTestClick={(t) => navigate(`/app/test-instructions/${t.id || t._id}`)} />
      )}

      {/* SUBJECT-WISE — Show subjects first, then tests */}
      {testType === 'subject' && !selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <button
              key={sub.name}
              onClick={() => setSelectedSubject(sub.name)}
              className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 shadow-md">
                <span className="text-white font-bold text-lg">{sub.name[0]}</span>
              </div>
              <h3 className="font-bold text-tb-navy dark:text-white">{sub.name}</h3>
              <p className="text-sm text-tb-gray-500 mt-1">{sub.tests.length} test{sub.tests.length !== 1 ? 's' : ''}</p>
            </button>
          ))}
        </div>
      )}

      {testType === 'subject' && selectedSubject && (
        <>
          <button onClick={() => setSelectedSubject(null)} className="text-sm text-tb-blue hover:underline">← Back to subjects</button>
          <TestGrid tests={filteredTests} onTestClick={(t) => navigate(`/app/test-instructions/${t.id || t._id}`)} />
        </>
      )}

      {/* CHAPTER-WISE — Show subjects → chapters → tests */}
      {testType === 'chapter' && !selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <button
              key={sub.name}
              onClick={() => setSelectedSubject(sub.name)}
              className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 shadow-md">
                <span className="text-white font-bold text-lg">{sub.name[0]}</span>
              </div>
              <h3 className="font-bold text-tb-navy dark:text-white">{sub.name}</h3>
              <p className="text-sm text-tb-gray-500 mt-1">{sub.tests.length} test{sub.tests.length !== 1 ? 's' : ''}</p>
            </button>
          ))}
        </div>
      )}

      {testType === 'chapter' && selectedSubject && !selectedChapter && (
        <>
          <button onClick={() => { setSelectedSubject(null); setSelectedChapter(null); }} className="text-sm text-tb-blue hover:underline">← Back to subjects</button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((ch) => (
              <button
                key={ch.name}
                onClick={() => setSelectedChapter(ch.name)}
                className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white font-bold text-lg">{ch.name[0]}</span>
                </div>
                <h3 className="font-bold text-tb-navy dark:text-white">{ch.name}</h3>
                <p className="text-sm text-tb-gray-500 mt-1">{ch.tests.length} test{ch.tests.length !== 1 ? 's' : ''}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {testType === 'chapter' && selectedSubject && selectedChapter && (
        <>
          <button onClick={() => setSelectedChapter(null)} className="text-sm text-tb-blue hover:underline">← Back to chapters</button>
          <TestGrid tests={filteredTests} onTestClick={(t) => navigate(`/app/test-instructions/${t.id || t._id}`)} />
        </>
      )}

      {/* Empty state */}
      {((testType === 'full' && tests.length === 0) ||
        (testType === 'subject' && !selectedSubject && subjects.length === 0) ||
        (testType === 'subject' && selectedSubject && filteredTests.length === 0) ||
        (testType === 'chapter' && !selectedSubject && subjects.length === 0) ||
        (testType === 'chapter' && selectedSubject && !selectedChapter && chapters.length === 0) ||
        (testType === 'chapter' && selectedSubject && selectedChapter && filteredTests.length === 0)) && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No tests available</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{typeLabel} tests will be added soon.</p>
        </div>
      )}
    </div>
  );
};

const TestGrid: React.FC<{ tests: any[]; onTestClick: (test: any) => void }> = ({ tests, onTestClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {tests.map((test: any) => (
      <button
        key={test.id || test._id}
        onClick={() => onTestClick(test)}
        className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all text-left"
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
            test.testType === 'full' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
            test.testType === 'subject' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
          }`}>
            {test.testType === 'full' ? 'Full Length' : test.testType === 'subject' ? 'Subject' : 'Chapter'}
          </div>
          {test.isPremium && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded text-xs font-bold">Premium</span>}
        </div>
        <h3 className="font-bold text-tb-navy dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{test.name || test.title}</h3>
        <div className="flex items-center gap-3 text-xs text-tb-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {test.questionCount || test.questionsCount || 0} Q</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {test.duration}m</span>
          {test.difficulty && (
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              test.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              test.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>{test.difficulty}</span>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {test.isPremium ? (
            <span className="text-sm font-bold text-amber-600">₹{test.price || 'Premium'}</span>
          ) : (
            <span className="text-sm font-bold text-green-600">Free</span>
          )}
        </div>
      </button>
    ))}
  </div>
);

export default TestListPage;
