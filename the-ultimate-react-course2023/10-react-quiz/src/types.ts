export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type QuizState = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finish';
  curIndex: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

export interface Action {
  type: string;
  payload?: any;
}
