type ProgressProps = {
  curIndex: number;
  amountQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: null | number;
};

const Progress = function ({
  curIndex,
  amountQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress
        max={amountQuestions}
        value={curIndex + Number(answer !== null)}
      />

      <p>
        Question <strong>{curIndex + 1}</strong> /{' '}
        <strong>{amountQuestions}</strong>
      </p>

      <p>
        <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong>
      </p>
    </header>
  );
};

export default Progress;
