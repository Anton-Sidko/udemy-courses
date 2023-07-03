const StartScreen = function ({
  amountQuestions,
}: {
  amountQuestions: number;
}): React.JSX.Element {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{amountQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
};

export default StartScreen;
