import { memo } from 'react';
import { Button } from '@/components/button';
import RefreshIcon from '@/assets/icons/rotate.svg?react';
import type { FooterProps } from './footer.props';

export const Footer = memo(({ gameStarted, onReset, resetButtonRef }: FooterProps) => {
  return (
    <div className="absolute bottom-0 w-full p-4 flex gap-8 justify-between items-center z-10">
      <p className="text-shadow-sm hidden lg:block">
        Press <span className="text-2xl px-1">Enter</span> to start game and{' '}
        <span className="text-2xl px-1">Backspace</span> to reset. Use <span className="text-2xl px-1">1-5</span> to
        select exact choice or <span className="text-2xl px-1">Space</span> to randomize.
      </p>
      {gameStarted && (
        <Button size="small" className="ml-auto" onClick={onReset} ref={resetButtonRef}>
          Reset Game
          <RefreshIcon width={20} height={20} />
        </Button>
      )}
    </div>
  );
});
