import type { Choice } from '@/types/choice';

export type ComputerSideProps = {
  gameStarted: boolean;
  loaderText: string;
  computerChoice?: Choice;
};
