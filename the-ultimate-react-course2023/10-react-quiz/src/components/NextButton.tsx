import { Action } from '../types';

type NextButtonProps = {
  dispatch: React.Dispatch<Action>;
  curIndex: number;
  amountQuestions: number;
  answer: null | number;
};

const NextButton = function ({
  dispatch,
  curIndex,
  amountQuestions,
  answer,
}: NextButtonProps) {
  if (answer === null) return null;

  const isLastQuestion = curIndex === amountQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch(isLastQuestion ? { type: 'finish' } : { type: 'nextQuestion' })
      }
    >
      {isLastQuestion ? 'Finish' : 'Next'}
    </button>
  );
};

export default NextButton;
