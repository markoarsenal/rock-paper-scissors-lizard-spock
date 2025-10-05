import type { Choice } from '@/types/choice';
import type { PlayResult } from '@/types/play';

export type HistoryItemProps = {
  playerChoice: Choice;
  computerChoice: Choice;
  result: PlayResult;
  round: number;
};
