export type PlayResult = 'win' | 'lose' | 'tie';

export type PlayResponse = {
  result: PlayResult;
  player: number;
  computer: number;
};
