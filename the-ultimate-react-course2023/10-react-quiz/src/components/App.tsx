import { useEffect, useReducer } from 'react';

import { reducer } from '../reducer';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import ErrorMessage from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress';
import EndScreen from './EndScreen';
import Footer from './Footer';
import Timer from './Timer';
import NextButton from './NextButton';
import { initialState } from '../data/const';

const App = function (): React.JSX.Element {
  const [
    {
      questions,
      status,
      curIndex,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                curIndex={curIndex}
                amountQuestions={amountQuestions}
                answer={answer}
              />
            </Footer>
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

