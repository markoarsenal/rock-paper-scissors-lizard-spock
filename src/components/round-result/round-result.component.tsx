import type { FC } from 'react';
import type { RoundResultProps } from './round-result.props';
import clsx from 'clsx';

export const RoundResult: FC<RoundResultProps> = ({ result, className }) => {
  const commonClassNames = clsx(
    'px-6 py-2 text-xl font-bold text-center rounded-lg bg-white text-nowrap shadow-default animate__animated animate__bounceIn',
    'lg:px-8 lg:py-3 lg:text-3xl',
    className,
  );

  if (result === 'win') return <h3 className={clsx('text-green-500', commonClassNames)}>You Win 🎉</h3>;
  if (result === 'lose') return <h3 className={clsx('text-red-600', commonClassNames)}>You Lose 💩</h3>;

  return <h3 className={clsx('text-yellow-500', commonClassNames)}>It's a Tie 🤝</h3>;
};
