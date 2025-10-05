import type { FC } from 'react';
import type { RoundResultProps } from './round-result.props';
import clsx from 'clsx';

export const RoundResult: FC<RoundResultProps> = ({ result, className }) => {
  const commonClassNames = clsx(
    'px-8 py-4 text-4xl font-bold text-center rounded-lg bg-white shadow-default animate__animated animate__bounceIn',
    className,
  );

  if (result === 'win') return <h3 className={clsx('text-green-500', commonClassNames)}>You Win 🎉</h3>;
  if (result === 'lose') return <h3 className={clsx('text-red-600', commonClassNames)}>You Lose 💩</h3>;

  return <h3 className={clsx('text-yellow-500', commonClassNames)}>It's a Tie 🤝</h3>;
};
