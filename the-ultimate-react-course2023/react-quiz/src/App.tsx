import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/Error';
import StartScreen from './components/StartScreen';

type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type QuizState = {
  questions: QuestionType[];
  status: string;
};

interface Action {
  type: string;
  payload?: any;
}

const initialState: QuizState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finish'
  status: 'loading',
};

const reducer = function (state: QuizState, action: Action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload as QuestionType[],
        status: 'ready',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Unknown action');
  }
};

const App = function (): React.JSX.Element {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
          <StartScreen amountQuestions={amountQuestions} />
        )}
      </Main>
    </div>
  );
};

export default App;

