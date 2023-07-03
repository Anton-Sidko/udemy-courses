import { useReducer } from 'react';

interface Action {
  type: string;
  payload?: any;
}

interface StateType {
  count: number;
  step: number;
}

const initialState: StateType = { count: 0, step: 1 };

const reducer = function (state: StateType, action: Action) {
  console.log(state, action);

  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 * state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 * state.step };
    case 'DEFINE_COUNT':
      return { ...state, count: action.payload };
    case 'DEFINE_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
};

const DateCounter = function (): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('June 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'DECREMENT' });
  };

  const inc = function () {
    dispatch({ type: 'INCREMENT' });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'DEFINE_COUNT', payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'DEFINE_STEP', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;

