import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Loader, BookmarkButton } from '@shared/components';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, ArrowLeft, Timer, Send, Eye, AlertCircle, Maximize } from '@shared/icons';
import TabSwitchWarning from '@features/test-exam/components/TabSwitchWarning';
import FullscreenWarning from '@features/test-exam/components/FullscreenWarning';
import TestExamTopBar from '@features/test-exam/components/TestExamTopBar';
import TimerProgressBar from '@features/test-exam/components/TimerProgressBar';
import TimesUpOverlay from '@features/test-exam/components/TimesUpOverlay';
import QuestionDisplay from '@features/test-exam/components/QuestionDisplay';
import QuestionNavigator from '@features/test-exam/components/QuestionNavigator';
import ExitTestModal from '@features/test-exam/components/ExitTestModal';
import SubmitTestModal from '@features/test-exam/components/SubmitTestModal';
import { useTestExam } from '@features/test-exam/hooks/useTestExam';
import { useTestTimer } from '@features/test-exam/hooks/useTestTimer';
import { useTestFullscreen } from '@features/test-exam/hooks/useTestFullscreen';
import { useTestTabSwitch } from '@features/test-exam/hooks/useTestTabSwitch';
import { useTestAutosave } from '@features/test-exam/hooks/useTestAutosave';

interface Section {
  name: string;
  questions: any[];
}

const TestExamPage: React.FC = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { currentTest, questions, loading, startTest, submitTest } = useTestExam();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [startTime] = useState(new Date().toISOString());
  const submittedRef = useRef(false);

  const totalQuestions = questions.length;
  const question = questions[currentQuestion];

  const sections: Section[] = useMemo(() => {
    const map = new Map<string, any[]>();
    questions.forEach((q: any) => {
      const name = q.section || q.sectionName || 'General';
      if (!map.has(name)) map.set(name, []);
      map.get(name)!.push(q);
    });
    if (currentTest?.sections) {
      for (const sec of currentTest.sections) {
        if (!map.has(sec.name)) map.set(sec.name, []);
      }
    }
    return Array.from(map.entries()).map(([name, qs]) => ({ name, questions: qs }));
  }, [questions, currentTest]);

  const currentSection = useMemo(() => {
    if (sections.length === 0 || questions.length === 0) return null;
    let remaining = currentQuestion;
    for (const section of sections) {
      if (remaining < section.questions.length) return section;
      remaining -= section.questions.length;
    }
    return sections[0];
  }, [sections, currentQuestion, questions]);

  const currentQInSection = useMemo(() => {
    if (!currentSection || sections.length === 0) return 0;
    let remaining = currentQuestion;
    for (const section of sections) {
      if (section === currentSection) return remaining;
      remaining -= section.questions.length;
    }
    return 0;
  }, [sections, currentSection, currentQuestion]);

  const getFlatIndex = useCallback((sectionIdx: number, qIdx: number) => {
    let flat = 0;
    for (let i = 0; i < sectionIdx; i++) flat += sections[i].questions.length;
    return flat + qIdx;
  }, [sections]);

  useEffect(() => {
    if (testId) startTest(testId);
  }, [testId, startTest]);

  const { timeLeft, timeUp } = useTestTimer(
    (currentTest?.duration || 0) * 60,
    isPaused,
    !!currentTest && !!question
  );

  const { isFullscreen, fullscreenWarning, setFullscreenWarning, enterFullscreen } = useTestFullscreen();

  const { lastSavedAt, isSaving, saveProgress, loadSaved, clearSaved } = useTestAutosave(testId, answers, flagged, currentQuestion, activeSectionIdx);

  const handleSectionChange = useCallback((sectionIdx: number) => {
    setActiveSectionIdx(sectionIdx);
    setCurrentQuestion(getFlatIndex(sectionIdx, 0));
    saveProgress();
  }, [getFlatIndex, saveProgress]);

  useEffect(() => {
    if (!testId) return;
    const saved = loadSaved();
    if (saved) {
      if (saved.answers) setAnswers(saved.answers);
      if (saved.flagged) setFlagged(new Set(saved.flagged));
      if (saved.currentQuestion !== undefined) setCurrentQuestion(saved.currentQuestion);
      if (saved.activeSectionIdx !== undefined) setActiveSectionIdx(saved.activeSectionIdx);
    }
  }, [testId, loadSaved]);

  const doSubmit = useCallback(async (finalAnswers: Record<string, number>, finalTimeLeft: number) => {
    if (submittedRef.current || !testId) return;
    submittedRef.current = true;
    const ans: Record<string, number> = {};
    questions.forEach((q: any) => { if (finalAnswers[q._id] !== undefined) ans[q._id] = finalAnswers[q._id]; });
    clearSaved();
    const submitted = await submitTest(testId, (currentTest?.duration || 60) * 60 - finalTimeLeft, startTime, new Date().toISOString(), ans);
    const resultId = (submitted as any)?.payload?.result?._id;
    navigate(resultId ? `/app/test-result/${testId}/${resultId}` : `/app/test-result/${testId}`);
  }, [testId, questions, submitTest, currentTest?.duration, startTime, navigate, clearSaved]);

  const handleMaxTabSwitches = useCallback(() => {
    doSubmit(answers, timeLeft);
  }, [doSubmit, answers, timeLeft]);

  const { tabSwitchCount, tabWarning, setTabWarning, maxTabSwitches } = useTestTabSwitch(handleMaxTabSwitches);

  const handleSubmit = useCallback(() => {
    setShowSubmitModal(false);
    setTabWarning(false);
    doSubmit(answers, timeLeft);
  }, [doSubmit, answers, timeLeft, setTabWarning]);

  const handleAnswer = (idx: number) => {
    if (!question || timeUp) return;
    setAnswers(p => ({ ...p, [question._id]: idx }));
    saveProgress();
  };

  const handleFlag = () => {
    setFlagged(p => { const n = new Set(p); n.has(currentQuestion) ? n.delete(currentQuestion) : n.add(currentQuestion); return n; });
  };

  const navigateQuestion = (d: number) => { const n = currentQuestion + d; if (n >= 0 && n < totalQuestions) setCurrentQuestion(n); };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const displayText = (value: unknown) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return displayText(record.text || record.label || record.name || record.title || '');
    }
    return String(value);
  };

  const getQuestionStatus = (i: number) => {
    const q = questions[i]; if (!q) return 'unvisited';
    if (answers[q._id] !== undefined) return 'answered';
    if (flagged.has(i)) return 'flagged';
    if (i === currentQuestion) return 'current';
    return 'unvisited';
  };

  const statusColors: Record<string, string> = { answered: 'bg-green-500 text-white', flagged: 'bg-amber-500 text-white', current: 'bg-blue-600 text-white ring-2 ring-blue-300', unvisited: 'bg-gray-200 text-gray-600' };
  const timePercentage = currentTest ? ((timeLeft / (currentTest.duration * 60)) * 100) : 0;
  const timeColor = timeLeft < 300 ? 'text-red-600' : timeLeft < 600 ? 'text-amber-600' : 'text-tb-navy';
  const savedLabel = isSaving ? 'Saving...' : lastSavedAt ? `Saved ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Autosave on';

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading test..." /></div>;
  if (!question) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-tb-gray-500">No questions available</p></div>;

  return (
    <div className="h-screen flex flex-col">
      <TabSwitchWarning tabWarning={tabWarning} tabSwitchCount={tabSwitchCount} maxTabSwitches={maxTabSwitches} onDismiss={() => setTabWarning(false)} />

      <FullscreenWarning fullscreenWarning={fullscreenWarning} onEnterFullscreen={enterFullscreen} />

      <TestExamTopBar testName={currentTest?.name || ''} currentQuestion={currentQuestion} totalQuestions={totalQuestions} savedLabel={savedLabel} isFullscreen={isFullscreen} timeColor={timeColor} formatTime={formatTime} timeLeft={timeLeft} isPaused={isPaused} onExit={() => setShowExitModal(true)} onTogglePause={() => setIsPaused(!isPaused)} onSubmit={() => setShowSubmitModal(true)} onRequestFullscreen={enterFullscreen} sections={sections} currentSection={currentSection} currentQInSection={currentQInSection} onSectionChange={handleSectionChange} />

      <TimerProgressBar timePercentage={timePercentage} timeLeft={timeLeft} />

      {timeUp ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-red-50/30">
          <TimesUpOverlay question={question} answers={answers} flagged={flagged} currentQuestion={currentQuestion} totalQuestions={totalQuestions} navigateQuestion={navigateQuestion} displayText={displayText} currentSection={currentSection} currentQInSection={currentQInSection} />
          <QuestionNavigator totalQuestions={totalQuestions} answers={answers} flagged={flagged} currentQuestion={currentQuestion} onNavigate={setCurrentQuestion} getQuestionStatus={getQuestionStatus} statusColors={statusColors} sections={sections} activeSectionIdx={activeSectionIdx} onSectionChange={handleSectionChange} />
        </div>
      ) : isPaused ? (
        <div className="flex-1 flex items-center justify-center bg-tb-gray-50">
          <div className="text-center"><Eye className="w-16 h-16 text-tb-gray-400 mx-auto mb-4" /><h3 className="text-xl font-bold text-tb-navy mb-2">Test Paused</h3><p className="text-tb-gray-500 mb-6">Click the eye icon to resume</p><Button variant="primary" onClick={() => setIsPaused(false)}>Resume Test</Button></div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <QuestionDisplay question={question} answers={answers} flagged={flagged} currentQuestion={currentQuestion} totalQuestions={totalQuestions} handleAnswer={handleAnswer} handleFlag={handleFlag} navigateQuestion={navigateQuestion} displayText={displayText} currentSection={currentSection} currentQInSection={currentQInSection} />
          <QuestionNavigator totalQuestions={totalQuestions} answers={answers} flagged={flagged} currentQuestion={currentQuestion} onNavigate={setCurrentQuestion} getQuestionStatus={getQuestionStatus} statusColors={statusColors} sections={sections} activeSectionIdx={activeSectionIdx} onSectionChange={handleSectionChange} />
        </div>
      )}

      <ExitTestModal showExitModal={showExitModal} onClose={() => setShowExitModal(false)} onExit={() => navigate('/app/dashboard')} />
      <SubmitTestModal showSubmitModal={showSubmitModal} onClose={() => setShowSubmitModal(false)} answers={answers} totalQuestions={totalQuestions} onSubmit={handleSubmit} sections={sections} />
    </div>
  );
};

export default TestExamPage;
