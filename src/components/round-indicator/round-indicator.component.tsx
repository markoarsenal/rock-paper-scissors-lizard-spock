import type { FC } from 'react';
import clsx from 'clsx';

import type { RoundIndicatorProps } from './round-indicator.props';

export const RoundIndicator: FC<RoundIndicatorProps> = ({ roundNumber, className }) => {
  return (
    <div
      className={clsx(
        'px-8 py-3 text-2xl font-bold text-center rounded-lg text-main bg-white text-nowrap shadow-default animate__animated animate__bounceIn',
        className,
      )}
    >
      Round {roundNumber}
    </div>
  );
};
