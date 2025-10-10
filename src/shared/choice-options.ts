import rock from '@/assets/images/play1.png';
import paper from '@/assets/images/play2.png';
import scissors from '@/assets/images/play3.png';
import lizard from '@/assets/images/play4.png';
import spock from '@/assets/images/play5.png';

import { Choice } from '@/types/choice';

export const choiceOptions: Record<Choice, { image: string; label: string; name: Choice; value: number }> = {
  [Choice.ROCK]: {
    image: rock,
    label: 'Rock',
    name: Choice.ROCK,
    value: 1,
  },
  [Choice.PAPER]: {
    image: paper,
    label: 'Paper',
    name: Choice.PAPER,
    value: 2,
  },
  [Choice.SCISSORS]: {
    image: scissors,
    label: 'Scissors',
    name: Choice.SCISSORS,
    value: 3,
  },
  [Choice.LIZARD]: {
    image: lizard,
    label: 'Lizard',
    name: Choice.LIZARD,
    value: 4,
  },
  [Choice.SPOCK]: {
    image: spock,
    label: 'Spock',
    name: Choice.SPOCK,
    value: 5,
  },
};
