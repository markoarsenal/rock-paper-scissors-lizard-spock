import { type FC } from 'react';

import computer from '@/assets/images/player-computer.png';
import { PlayerBase } from '../player-base';
import type { PlayerProps } from '../../player.props';

export const PlayerComputer: FC<PlayerProps> = props => {
  const thumbnailClassName = 'top-auto bottom-4 bg-secondary lg:left-auto lg:right-4 lg:top-4 lg:bottom-auto';

  return <PlayerBase image={computer} thumbnailClassName={thumbnailClassName} {...props} />;
};
