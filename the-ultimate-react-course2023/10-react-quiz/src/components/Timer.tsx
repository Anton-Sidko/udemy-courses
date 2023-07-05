import { useEffect } from 'react';
import { Action } from '../types';

type TimerProps = {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number | null;
};

const Timer = function ({ dispatch, secondsRemaining }: TimerProps) {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch]);

  if (secondsRemaining === null) return null;

  const minutes = secondsRemaining && Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining && secondsRemaining % 60;

  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
