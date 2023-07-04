import { useEffect, useReducer } from 'react';

import { Action, QuizState, initialState } from '../types';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import ErrorMessage from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const reducer = function (state: QuizState, action: Action): QuizState {
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
      return { ...state, status: 'active' };
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
    default:
      throw new Error('Unknown action');
  }
};

const App = function (): React.JSX.Element {
  const [{ questions, status, curIndex, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const amountQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen
            amountQuestions={amountQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <Question
            questionObj={questions[curIndex]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
};

export default App;

