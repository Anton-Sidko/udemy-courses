const ErrorMessage = function ({ message }: { message: string }): JSX.Element {
  return (
    <p className="error">
      <span>⛔ </span>
      {message}
    </p>
  );
};

export default ErrorMessage;
