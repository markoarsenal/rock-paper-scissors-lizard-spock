import type { Choice } from '@/types/choice';

export type ChoicesProps = {
  value?: Choice;
  onSelect?: (choice: Choice) => void;
};
