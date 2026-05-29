import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Button } from '@shared/components';
import LockedTestCard from '@features/test-exam/components/LockedTestCard';
import { useTestExam } from '@features/test-exam/hooks/useTestExam';

const TestInstructionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [agreed, setAgreed] = useState(false);
  const { currentTest, loading, startTest } = useTestExam();

  useEffect(() => {
    if (testId) startTest(testId);
  }, [testId, startTest]);

  const isLocked = currentTest?.isLocked === true;
  const handleStartTest = () => {
    if (!testId) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    navigate(`/app/test-exam/${testId}`);
  };

  const questions = Array.isArray(currentTest?.questions) ? currentTest.questions : [];
  const questionCount = questions.length || currentTest?.totalQuestions || 0;
  const totalMarks = currentTest?.totalMarks || questions.reduce((sum: number, q: any) => sum + Number(q.marks || 0), 0);
  const marksPerQuestion = questionCount > 0 ? totalMarks / questionCount : 0;
  const correctMarksLabel = Number.isInteger(marksPerQuestion) ? marksPerQuestion : Number(marksPerQuestion.toFixed(2));
  const questionNegativeMarks: number[] = questions.length > 0
    ? questions.map((q: any) => Number(q.negativeMarks ?? currentTest?.negativeMarks ?? 0))
    : [Number(currentTest?.negativeMarks || 0)];
  const uniqueNegativeMarks = Array.from(new Set<number>(questionNegativeMarks));
  const hasNegativeMarking = uniqueNegativeMarks.some((mark) => mark > 0);
  const negativeMarksText = !hasNegativeMarking ? 'No negative marking.'
    : uniqueNegativeMarks.length === 1 ? `-${uniqueNegativeMarks[0]} for wrong answer.`
    : 'Negative marking varies.';
  const passingMarks = currentTest?.passingMarks || Math.ceil(totalMarks * 0.4);
  const subjectLabel = currentTest?.subject || currentTest?.category || 'this exam';

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader size="lg" label="Loading test instructions..." /></div>;
  }
  if (!currentTest) return null;
  if (isLocked) {
    return <LockedTestCard test={currentTest} onUnlock={() => navigate('/app/payment')} onBrowseFree={() => navigate('/app/test-series')} />;
  }

  const sections = currentTest.sections && currentTest.sections.length > 0 ? currentTest.sections : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500">{currentTest.category}</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{currentTest.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />{questionCount} Questions</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500" />{totalMarks} Marks</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" />{currentTest.duration} mins</span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Instructions</h2>
            <div className="space-y-4">
              <div className="flex gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">1</div><p className="pt-0.5 text-sm leading-6 text-gray-700">This test contains <strong>{questionCount} questions</strong> from <strong>{subjectLabel}</strong>.</p></div>
              <div className="flex gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">2</div><p className="pt-0.5 text-sm leading-6 text-gray-700">Each correct answer carries <strong>{correctMarksLabel} mark{correctMarksLabel === 1 ? '' : 's'}</strong>. {negativeMarksText}</p></div>
              <div className="flex gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-600">3</div><p className="pt-0.5 text-sm leading-6 text-gray-700">Total duration is <strong>{currentTest.duration} minutes</strong>. Test auto-submits when time ends.</p></div>
              <div className="flex gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">4</div><p className="pt-0.5 text-sm leading-6 text-gray-700">Do not refresh or close the browser during the test.</p></div>
              <div className="flex gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-50 text-xs font-bold text-purple-600">5</div><p className="pt-0.5 text-sm leading-6 text-gray-700">Passing marks: <strong>{passingMarks}/{totalMarks}</strong></p></div>
            </div>
          </div>

          {sections && (
            <div>
              <h2 className="mb-3 text-base font-semibold text-gray-900">Sections</h2>
              <div className="space-y-2">
                {sections.map((sec: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{sec.name}</p>
                      {sec.subject && <p className="text-xs text-gray-500">{sec.subject}</p>}
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{sec.questionCount} Q</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTest.description && (
            <div>
              <h2 className="mb-3 text-base font-semibold text-gray-900">About</h2>
              <p className="text-sm leading-6 text-gray-600">{currentTest.description}</p>
            </div>
          )}
        </div>

        <hr className="my-8 border-gray-200" />

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-600">I have read and agree to the instructions</span>
        </label>

        <div className="mt-6">
          <Button variant="primary" size="lg" className="w-full sm:w-auto px-8" disabled={!agreed} onClick={handleStartTest}>Start Test</Button>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionsPage;
