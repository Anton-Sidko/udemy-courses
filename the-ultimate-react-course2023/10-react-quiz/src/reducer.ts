import { SECS_PER_QUESTION, initialState } from './data/const';
import { Action, QuizState } from './types';

export const reducer = function (state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions[state.curIndex];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, curIndex: state.curIndex + 1, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finish',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };

    case 'tick':
      if (state.secondsRemaining === 0) {
        return {
          ...state,
          status: 'finish',
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      }
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining !== null ? state.secondsRemaining - 1 : null,
      };

    default:
      throw new Error('Unknown action');
  }
};
