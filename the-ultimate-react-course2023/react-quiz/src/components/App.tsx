import { useEffect, useReducer } from 'react';

import { initialState } from '../types';
import { reducer } from '../reducer';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import ErrorMessage from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import EndScreen from './EndScreen';

const App = function (): React.JSX.Element {
  const [{ questions, status, curIndex, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const amountQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

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
          <>
            <Progress
              curIndex={curIndex}
              amountQuestions={amountQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questionObj={questions[curIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              curIndex={curIndex}
              amountQuestions={amountQuestions}
              answer={answer}
            />
          </>
        )}
        {status === 'finish' && (
          <EndScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;

