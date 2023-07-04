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
};

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: QuizState = {
  questions: [],
  status: 'loading',
  curIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
};
