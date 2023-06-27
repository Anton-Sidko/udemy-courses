import { ToggleButtonProps } from '../types';

const ToggleButton = function ({
  isOpen,
  onSetIsOpen,
}: ToggleButtonProps): JSX.Element {
  return (
    <button
      className="btn-toggle"
      onClick={onSetIsOpen}
    >
      {isOpen ? '–' : '+'}
    </button>
  );
};

export default ToggleButton;
