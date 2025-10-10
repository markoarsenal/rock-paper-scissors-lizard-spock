import { type FC } from 'react';

import player from '@/assets/images/player-person.png';
import { PlayerBase } from '../player-base';
import type { PlayerProps } from '../../player.props';

export const PlayerPersonInGame: FC<PlayerProps> = props => {
  const className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  const thumbnailClassName = 'top-4 left-4 bg-main';

  return <PlayerBase image={player} className={className} thumbnailClassName={thumbnailClassName} {...props} />;
};
