import apiClient from '@shared/utils/apiClient';

export interface ExplanationData {
  text: string;
  steps: string[];
  formula: string;
}

export interface TestResultData {
  _id: string;
  testId: string;
  testName: string;
  category: string;
  hasPremiumInCategory: boolean;
  score: number;
  totalMarks: number;
  scoreBeforeNegative?: number;
  negativeMarks?: number;
  negativeMarksDeducted?: number;
  percentage?: number;
  passingMarks?: number;
  qualified?: boolean;
  resultStatus?: string;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  percentile: number;
  rank: number;
  timeTaken: number;
  allottedTime?: number;
  totalQuestions: number;
  completedAt: string;
  streak?: {
    current: number;
    awarded: boolean;
    message: string;
    nextEligibleAt: string;
  };
  questionReviews: { _id: string; question: string; type: string; options: string[]; correctAnswer: number; explanation: string | ExplanationData; difficulty: string; subject: string; topic: string; negativeMarks?: number; userAnswer: number | null; isCorrect: boolean; image?: string; attachmentUrl?: string; attachmentType?: string; section?: string }[];
  _questionReviewsRaw?: any[];
  topicAnalysis: { topic: string; total: number; correct: number; wrong: number; skipped: number; accuracy: number }[];
}

const toDisplayText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return toDisplayText(record.text || record.label || record.name || record.title || '');
  }
  return String(value);
};

const normalizeTestResult = (data: TestResultData): TestResultData => ({
  ...data,
  questionReviews: (data.questionReviews || []).map((review) => ({
    ...review,
    question: toDisplayText(review.question),
    options: Array.isArray(review.options) ? review.options.map(toDisplayText) : [],
    difficulty: toDisplayText(review.difficulty),
    subject: toDisplayText(review.subject),
    topic: toDisplayText(review.topic),
  })),
});

export const fetchTestResult = async (resultId: string): Promise<TestResultData> => {
  const response = await apiClient.get(`/tests/result/${resultId}`);
  return normalizeTestResult(response.data.data);
};

export const fetchLatestTestResult = async (testId: string): Promise<TestResultData> => {
  const latestResponse = await apiClient.get(`/tests/result/latest/${testId}`);
  const resultId = latestResponse.data.data.resultId;
  return fetchTestResult(resultId);
};
