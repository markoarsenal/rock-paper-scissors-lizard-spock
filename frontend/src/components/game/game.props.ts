import type { Choice } from '../choices/choices.props';

export type GameState = {
  started: boolean;
  choice?: Choice;
};
