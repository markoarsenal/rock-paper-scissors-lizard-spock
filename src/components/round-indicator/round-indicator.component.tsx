import { type FC, useState, useEffect } from 'react';
import clsx from 'clsx';

import type { RoundIndicatorProps } from './round-indicator.props';

export const RoundIndicator: FC<RoundIndicatorProps> = ({ roundNumber, className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    setIsAnimatingOut(false);
    setIsVisible(true);

    const animationTimer = setTimeout(() => setIsAnimatingOut(true), 1000);
    const visibilityTimer = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(visibilityTimer);
    };
  }, [roundNumber]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        'px-6 py-2 text-xl font-bold text-center rounded-lg text-main bg-white text-nowrap shadow-default animate__animated',
        'lg:px-8 lg:py-3 lg:text-2xl',
        isAnimatingOut ? 'animate__bounceOut' : 'animate__bounceIn',
        className,
      )}
    >
      Round {roundNumber}
    </div>
  );
};
