import { type FC } from 'react';
import clsx from 'clsx';

import type { PlayerBaseProps } from './player-base.props';

import styles from './player-base.module.scss';

export const PlayerBase: FC<PlayerBaseProps> = ({
  image,
  animateShake = true,
  showAsThumbnail = false,
  className,
  thumbnailClassName,
}) => {
  const shakeClass = animateShake ? 'animate__animated animate__headShake animate__infinite' : '';

  const thumbnailClass = showAsThumbnail
    ? clsx(
        'w-[50px] h-[50px] p-2 rounded-full border-2 border-white shadow-default translate-none',
        'lg:w-[100px] lg:h-[100px] lg:border-4',
        thumbnailClassName,
      )
    : 'h-1/2 max-h-[500px] lg:w-1/2 lg:max-w-[400px] lg:h-auto lg:max-h-none';

  return (
    <div className={clsx('transition-all duration-400', className, thumbnailClass)}>
      <div className="w-full h-full flex items-center justify-center animate__animated animate__bounceIn">
        <img src={image} alt="Player" className={clsx('h-full', styles.player, shakeClass)} />
      </div>
    </div>
  );
};
