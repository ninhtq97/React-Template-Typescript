import { useEffect } from 'react';
import { KeyCodes } from 'shared/constants/keyCode';

const useOnEscapeKeyDown = (
  isListening: boolean,
  onEscapeKeyDown: Function
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === KeyCodes.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
