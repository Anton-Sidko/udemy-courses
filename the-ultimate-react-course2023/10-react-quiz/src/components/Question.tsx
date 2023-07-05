import { Action, QuestionType } from '../types';
import Options from './Options';

type QuestionProps = {
  questionObj: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: null | number;
};

const Question = function ({
  questionObj,
  dispatch,
  answer,
}: QuestionProps): React.JSX.Element {
  const { question } = questionObj;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        questionObj={questionObj}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
};

export default Question;
