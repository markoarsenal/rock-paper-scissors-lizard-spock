import type { PlayResponse } from '@/types/play';

export type RoundResultType = PlayResponse & {
  roundNumber: number;
};
