import { Action, QuestionType } from '../types';

type OptionsProps = {
  questionObj: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: null | number;
};

const Options = function ({ questionObj, dispatch, answer }: OptionsProps) {
  const { options, correctOption } = questionObj;
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : ''
          }`.trim()}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
