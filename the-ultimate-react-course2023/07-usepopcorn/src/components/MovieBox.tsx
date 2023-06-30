import { useState } from 'react';
import ToggleButton from './ToggleButton';

const MovieBox = function ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleOpen = function () {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="box">
      <ToggleButton
        isOpen={isOpen}
        onSetIsOpen={handleToggleOpen}
      />

      {isOpen && children}
    </div>
  );
};

export default MovieBox;
