import { type FC } from 'react';

import player from '@/assets/images/player-person.png';
import { PlayerBase } from '../player-base';
import type { PlayerProps } from '../../player.props';

export const PlayerPerson: FC<PlayerProps> = props => {
  return <PlayerBase image={player} {...props} />;
};
