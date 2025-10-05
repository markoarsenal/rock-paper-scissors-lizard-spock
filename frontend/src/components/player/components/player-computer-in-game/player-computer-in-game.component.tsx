import { type FC } from 'react';

import computer from '@/assets/images/player-computer.png';
import { PlayerBase } from '../player-base';
import type { PlayerProps } from '../../player.props';

export const PlayerComputerInGame: FC<PlayerProps> = props => {
  const className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  const thumbnailClassName = 'top-auto bottom-4 left-4 bg-secondary lg:left-auto lg:right-4 lg:top-4 lg:bottom-auto';

  return <PlayerBase image={computer} className={className} thumbnailClassName={thumbnailClassName} {...props} />;
};
