import { type FC } from 'react';
import clsx from 'clsx';

import type { PlayerBaseProps } from './player-base.props';

import styles from './player-base.module.scss';

export const PlayerBase: FC<PlayerBaseProps> = ({
  image,
  animateShake = true,
  showAsThumbnail = false,
  thumbnailClassName,
}) => {
  const shakeClass = animateShake ? 'animate__animated animate__headShake animate__infinite' : '';

  const thumbnailClass = showAsThumbnail
    ? clsx(
        'w-[100px] h-[100px] p-2 rounded-full border-4 border-white shadow-default top-4 left-4 translate-none',
        thumbnailClassName,
      )
    : 'h-1/2 max-h-[500px] lg:w-1/2 lg:max-w-[400px] lg:h-auto lg:max-h-none';

  return (
    <div
      className={clsx(
        'flex items-center justify-center animate__animated animate__bounceIn transition-all transition-duration-1000 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        thumbnailClass,
      )}
    >
      <img src={image} alt="Player" className={clsx('h-full', styles.player, shakeClass)} />
    </div>
  );
};
