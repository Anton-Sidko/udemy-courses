import { useEffect } from 'react';

export const useKey = function (keyCode: string, action: () => void) {
  useEffect(() => {
    const handleKeydown = function (e: KeyboardEvent) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return function () {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [keyCode, action]);
};
