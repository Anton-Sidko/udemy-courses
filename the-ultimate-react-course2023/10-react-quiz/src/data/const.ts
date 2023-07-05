import { QuizState } from '../types';

export const initialState: QuizState = {
  questions: [],
  status: 'loading',
  curIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

export const SECS_PER_QUESTION = 20;
