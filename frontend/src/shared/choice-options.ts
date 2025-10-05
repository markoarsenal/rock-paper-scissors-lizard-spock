import rock from '@/assets/images/play1.png';
import paper from '@/assets/images/play2.png';
import scissors from '@/assets/images/play3.png';
import lizard from '@/assets/images/play4.png';
import spock from '@/assets/images/play5.png';

import { Choice } from '@/types/choice';

export const choiceOptions: { id: number; image: string; label: string; value: Choice }[] = [
  {
    id: 0,
    image: rock,
    label: 'Rock',
    value: Choice.ROCK,
  },
  {
    id: 1,
    image: paper,
    label: 'Paper',
    value: Choice.PAPER,
  },
  {
    id: 2,
    image: scissors,
    label: 'Scissors',
    value: Choice.SCISSORS,
  },
  {
    id: 3,
    image: lizard,
    label: 'Lizard',
    value: Choice.LIZARD,
  },
  {
    id: 4,
    image: spock,
    label: 'Spock',
    value: Choice.SPOCK,
  },
];
