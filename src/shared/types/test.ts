// Feature types - extend as needed
export interface ITest {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestion {
  id: string;
  testId: string;
  text: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface ITestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalPoints: number;
  answers: Record<string, string | string[]>;
  timeTaken: number;
  completedAt: string;
}
