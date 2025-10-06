import { useEffect } from 'react';

type UseKeyboardControlsProps = {
  onRandomize: () => void;
  onSelect: (num: number) => void;
};

export const useKeyboardControls = ({ onRandomize, onSelect }: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') onRandomize();
      if (e.key === '1') onSelect(0);
      if (e.key === '2') onSelect(1);
      if (e.key === '3') onSelect(2);
      if (e.key === '4') onSelect(3);
      if (e.key === '5') onSelect(4);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onRandomize, onSelect]);
};
