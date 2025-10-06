import type { PlayResponse } from '@/types/play';

export enum LoaderText {
  DATA_LOADING = 'Loading data...',
  COMPUTER_WAITING = 'Computer is waiting for your move...',
  COMPUTER_MAKING_MOVE = 'Computer is making its move...',
}

export type RoundResultType = PlayResponse & {
  roundNumber: number;
};
