import type { Choice } from '@/types/choice';

export type HistoryItemProps = {
  playerChoice: Choice;
  computerChoice: Choice;
  result: 'win' | 'lose' | 'draw';
  round: number;
};
