import { useEffect } from 'react';

type UseKeyboardControlsProps = {
  onGameStart: () => void;
  onGameReset: () => void;
};

export const useKeyboardControls = ({ onGameStart, onGameReset }: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onGameStart();
      if (e.key === 'Backspace') onGameReset();
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onGameStart, onGameReset]);
};
