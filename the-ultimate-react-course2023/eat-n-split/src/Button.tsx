import { ButtonProps } from './types';

export const Button = function ({
  handleClick,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={handleClick}
      className="button"
    >
      {children}
    </button>
  );
};
