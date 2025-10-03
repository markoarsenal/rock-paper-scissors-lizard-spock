import { type FC } from 'react';

import computer from '@/assets/images/player-computer.png';
import { PlayerBase } from '../player-base';
import type { PlayerProps } from '../../player.props';

export const PlayerComputer: FC<PlayerProps> = props => {
  return <PlayerBase image={computer} {...props} />;
};
