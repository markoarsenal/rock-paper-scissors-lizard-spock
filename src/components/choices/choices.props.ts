import type { Choice } from '@/types/choice';

export type ChoicesProps = {
  value?: Choice;
  clickDisabled?: boolean;
  onSelect?: (choice: Choice) => void;
};
