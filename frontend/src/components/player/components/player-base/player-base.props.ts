import type { PlayerProps } from '../../player.props';

export type PlayerBaseProps = PlayerProps & {
  image: string;
  thumbnailClassName?: string;
};
