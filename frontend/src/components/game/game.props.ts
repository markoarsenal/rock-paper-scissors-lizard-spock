import type { Choice } from '@/types/choice';

export type GameState = {
  started: boolean;
  playerScore: number;
  computerScore: number;
  choice?: Choice;
};

export enum LoaderText {
  DATA_LOADING = 'Loading data...',
  COMPUTER_WAITING = 'Computer is waiting for your move...',
  COMPUTER_MAKING_MOVE = 'Computer is making its move...',
}
