import type { Choice } from '../choices/choices.props';

export type GameState = {
  started: boolean;
  choice?: Choice;
};

export enum LoaderText {
  COMPUTER_WAITING = 'Computer is waiting for your move...',
  COMPUTER_MAKING_MOVE = 'Computer is making its move...',
}
