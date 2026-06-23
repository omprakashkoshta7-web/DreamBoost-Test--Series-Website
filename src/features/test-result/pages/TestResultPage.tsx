import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@shared/components';
import { useAppDispatch } from '@store/hooks';
import { fetchLatestTestResult } from '@features/test-result/store/result.thunks';
import { useTestResult } from '../hooks';
import { displayText } from '../utils';
import { CheckCircle, Clock, Minus, Target, XCircle } from '@shared/icons';
import ScoreHeaderCard from '@features/test-result/components/ScoreHeaderCard';
import QuickStatsRow from '@features/test-result/components/QuickStatsRow';
import ResultStatsGrid from '@features/test-result/components/ResultStatsGrid';
import ResultTabs from '@features/test-result/components/ResultTabs';
import ResultActions from '@features/test-result/components/ResultActions';
import StreakPopupModal from '@features/test-result/components/StreakPopupModal';
import PremiumUpsellModal from '@features/test-result/components/PremiumUpsellModal';
import QuestionReviewItem from '@features/test-result/components/QuestionReviewItem';
import TopicAnalysisItem from '@features/test-result/components/TopicAnalysisItem';
import SEO from '@shared/components/SEO';

type SectionRow = {
  section: string;
  score: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  timeTaken: string;
};

const TestResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { testId, resultId } = useParams();
  const dispatch = useAppDispatch();
  const { result, loading, error, fetchResult } = useTestResult();

  const [activeTab, setActiveTab] = useState<'review' | 'topic'>('review');
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    if (resultId) {
      fetchResult(resultId);
    } else if (testId) {
      dispatch(fetchLatestTestResult(testId));
    }
  }, [testId, resultId, dispatch, fetchResult]);

  useEffect(() => {
    if (error && testId && (error.toLowerCase().includes('no test result found') || error.toLowerCase().includes('complete and submit'))) {
      navigate(`/app/test-instructions/${testId}`, { replace: true });
    }
  }, [error, testId, navigate]);

  useEffect(() => {
    if (result?.streak?.awarded) {
      setShowStreakPopup(true);
    }
  }, [result?.streak?.awarded]);

  useEffect(() => {
    if (result?.hasPremiumInCategory) {
      setShowUpsell(true);
    }
  }, [result?.hasPremiumInCategory]);

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.round(seconds || 0));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const remainingSeconds = safeSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const norm = (v: unknown): string => {
    if (v === null || v === undefined) return '';
    return String(v).trim();
  };

  const reviews = result?.questionReviews || [];
  const totalQuestions = result?.totalQuestions || reviews.length || 0;

  const sectionRows = useMemo<SectionRow[]>(() => {
    const sectionMap = new Map<string, { total: number; correct: number; wrong: number; skipped: number }>();

    reviews.forEach((review) => {
      const section = displayText(review.section) || 'General';
      const current = sectionMap.get(section) || { total: 0, correct: 0, wrong: 0, skipped: 0 };
      current.total += 1;
      if (review.userAnswer === null || review.userAnswer === undefined) {
        current.skipped += 1;
      } else if (review.isCorrect) {
        current.correct += 1;
      } else {
        current.wrong += 1;
      }
      sectionMap.set(section, current);
    });

    const rows = Array.from(sectionMap.entries()).map(([section, data], index): SectionRow => {
      const completedCount = data.correct + data.wrong;
      const scorePortion = totalQuestions > 0 ? Math.round(((result?.score || 0) * completedCount) / totalQuestions) : 0;
      return {
        section,
        score: scorePortion,
        correct: data.correct,
        incorrect: data.wrong,
        skipped: data.skipped,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        timeTaken: index === 0 ? formatTime(result?.timeTaken || 0) : '-',
      };
    });

    if (rows.length === 0) {
      rows.push({
        section: 'General',
        score: 0,
        correct: 0,
        incorrect: 0,
        skipped: totalQuestions,
        accuracy: 0,
        timeTaken: formatTime(result?.timeTaken || 0),
      });
    }
    return rows;
  }, [reviews, result?.score, result?.timeTaken, totalQuestions]);

  const score = result?.score || 0;
  const totalMarks = result?.totalMarks || 0;
  const correctCount = result?.correctAnswers || 0;
  const wrongCount = result?.wrongAnswers || 0;
  const skippedCount = result?.skippedAnswers || 0;
  const accuracy = result?.accuracy || 0;
  const timeUsed = result?.timeTaken || 0;
  const allottedTime = result?.allottedTime || 0;
  const percentile = result?.percentile || 0;

  const summaryCards = [
    {
      label: 'Correct',
      value: `${correctCount}/${totalQuestions || 0}`,
      icon: CheckCircle,
      iconClass: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      subLabel: 'Marks Obtained',
      subValue: `${Math.max(0, score)}`,
      subValueColor: 'text-emerald-600',
      barWidth: totalQuestions ? (correctCount / totalQuestions) * 100 : 0,
      barColor: 'bg-sky-400',
    },
    {
      label: 'Incorrect',
      value: `${wrongCount}/${totalQuestions || 0}`,
      icon: XCircle,
      iconClass: 'text-red-500',
      iconBg: 'bg-red-50',
      subLabel: 'Marks Lost',
      subValue: `${Math.max(0, result?.negativeMarksDeducted || 0)}`,
      subValueColor: 'text-red-500',
      barWidth: totalQuestions ? (wrongCount / totalQuestions) * 100 : 0,
      barColor: 'bg-red-300',
    },
    {
      label: 'Skipped',
      value: `${skippedCount}/${totalQuestions || 0}`,
      icon: Minus,
      iconClass: 'text-slate-400',
      iconBg: 'bg-slate-50',
      subLabel: 'Marks Skipped',
      subValue: `${Math.max(0, skippedCount)}`,
      subValueColor: 'text-slate-600',
      barWidth: totalQuestions ? (skippedCount / totalQuestions) * 100 : 0,
      barColor: 'bg-sky-400',
    },
    {
      label: 'Accuracy',
      value: `${Math.round(accuracy)}%`,
      icon: Target,
      iconClass: 'text-blue-500',
      iconBg: 'bg-blue-50',
      barWidth: Math.max(0, Math.min(100, accuracy)),
      barColor: 'bg-sky-400',
    },
    {
      label: 'Completed',
      value: `${totalQuestions > 0 ? ((correctCount + wrongCount) / totalQuestions * 100).toFixed(2) : '0.00'}%`,
      icon: CheckCircle,
      iconClass: 'text-violet-500',
      iconBg: 'bg-violet-50',
      barWidth: totalQuestions ? ((correctCount + wrongCount) / totalQuestions) * 100 : 0,
      barColor: 'bg-sky-400',
    },
    {
      label: 'Time Taken',
      value: formatTime(timeUsed),
      icon: Clock,
      iconClass: 'text-amber-500',
      iconBg: 'bg-amber-50',
      barWidth: allottedTime > 0 ? Math.min(100, (timeUsed / allottedTime) * 100) : 0,
      barColor: 'bg-amber-400',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" label="Loading results..." />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-tb-red">
          <XCircle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-tb-navy">Result not available</h1>
        <p className="mt-2 text-sm text-tb-gray-500">
          {error || 'We could not find this result. Please open it again from My Tests or Dashboard.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1560px] space-y-6 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <SEO title="Test Result" noIndex />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-[28px] font-bold leading-none text-slate-900 sm:text-[32px]">Result Summary</h1>
          {result.testName && <p className="mt-1 text-sm text-slate-500">{result.testName}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${result.qualified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {result.resultStatus || (result.qualified ? 'Qualified' : 'Not Qualified')}
          </span>
          {result.percentage !== undefined && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{result.percentage}%</span>
          )}
        </div>
      </div>

      <ScoreHeaderCard score={score} totalMarks={totalMarks} />

      <QuickStatsRow correctAnswers={correctCount} percentile={percentile} formatTime={formatTime} timeUsed={timeUsed} />

      <section className="rounded-[28px] bg-[#eef3ff] px-5 py-7 sm:px-8 sm:py-8">
        <h2 className="text-center text-[22px] font-bold text-slate-900 sm:text-[28px]">Your Progress</h2>
        <ResultStatsGrid correctCount={correctCount} wrongCount={wrongCount} skippedCount={skippedCount} percentile={percentile} accuracy={accuracy} result={result} />
      </section>

      {/* Section-wise performance */}
      <section className="overflow-hidden rounded-[28px] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-8">
        <h2 className="text-2xl font-bold text-slate-900">Section Wise Performance</h2>
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[980px] overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[2.2fr_.9fr_.9fr_.9fr_.9fr_.9fr_1fr] items-center gap-4 bg-[#edf2ff] px-4 py-4 text-[15px] font-medium text-slate-700">
              <div>Section</div>
              <div>Score</div>
              <div>Correct</div>
              <div>Incorrect</div>
              <div>Skipped</div>
              <div>Accuracy</div>
              <div>Time Taken</div>
            </div>
            <div className="bg-white">
              {sectionRows.map((row) => (
                <div key={row.section} className="grid grid-cols-[2.2fr_.9fr_.9fr_.9fr_.9fr_.9fr_1fr] items-center gap-4 border-t border-slate-100 px-4 py-4 text-[16px] text-slate-900 first:border-t-0">
                  <div className="truncate pr-2 font-medium">{row.section}</div>
                  <div>{row.score}</div>
                  <div>{row.correct}</div>
                  <div>{row.incorrect}</div>
                  <div>{row.skipped}</div>
                  <div>{row.accuracy}%</div>
                  <div>{row.timeTaken}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review / Topic tabs */}
      <section className="overflow-hidden rounded-[28px] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-8">
        <ResultTabs tab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 space-y-4">
          {activeTab === 'review' ? (
            reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <QuestionReviewItem
                  key={review._id}
                  q={{
                    question: review.question,
                    options: review.options,
                    correct: typeof review.correctAnswer === 'number' ? review.correctAnswer : Number(review.correctAnswer ?? 0),
                    explanation: review.explanation || '',
                    difficulty: review.difficulty,
                    type: review.type || 'mcq',
                    subject: review.subject,
                    topic: review.topic,
                    section: review.section,
                    image: review.image || null,
                    attachmentType: review.attachmentType,
                  }}
                  index={idx}
                  userAnswer={review.userAnswer}
                  norm={norm}
                />
              ))
            ) : (
              <p className="py-10 text-center text-sm text-slate-500">No question reviews available.</p>
            )
          ) : (
            (result.topicAnalysis && result.topicAnalysis.length > 0) ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.topicAnalysis.map((ta) => (
                  <TopicAnalysisItem key={ta.topic} topic={ta.topic} data={{ total: ta.total, correct: ta.correct, wrong: ta.wrong }} />
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-slate-500">No topic analysis data available.</p>
            )
          )}
        </div>
      </section>

      {/* Actions */}
      <ResultActions
        testId={testId}
        onRetake={() => navigate(`/app/test-instructions/${testId}`)}
        onPrint={() => window.print()}
        onDashboard={() => navigate('/app/dashboard')}
        onLeaderboard={() => navigate('/app/leaderboard')}
      />

      {/* Modals */}
      {result.streak && (
        <StreakPopupModal showStreakPopup={showStreakPopup} onClose={() => setShowStreakPopup(false)} result={result} />
      )}
      {result.hasPremiumInCategory && (
        <PremiumUpsellModal showUpsell={showUpsell} onClose={() => setShowUpsell(false)} result={result} onViewPlans={() => { navigate('/app/plans'); setShowUpsell(false); }} />
      )}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .mx-auto.max-w-\\[1560px\\], .mx-auto.max-w-\\[1560px\\] * { visibility: visible; }
          .mx-auto.max-w-\\[1560px\\] { position: absolute; left: 0; top: 0; width: 100%; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
};
export default TestResultPage;
