import rock from '@/assets/images/play1.png';
import paper from '@/assets/images/play2.png';
import scissors from '@/assets/images/play3.png';
import lizard from '@/assets/images/play4.png';
import spock from '@/assets/images/play5.png';

import { Choice } from './choices.props';

export const options: { image: string; label: string; value: Choice; angle: number }[] = [
  {
    image: rock,
    label: 'Rock',
    value: Choice.ROCK,
    angle: 0,
  },
  {
    image: paper,
    label: 'Paper',
    value: Choice.PAPER,
    angle: 72,
  },
  {
    image: scissors,
    label: 'Scissors',
    value: Choice.SCISSORS,
    angle: 144,
  },
  {
    image: lizard,
    label: 'Lizard',
    value: Choice.LIZARD,
    angle: 216,
  },
  {
    image: spock,
    label: 'Spock',
    value: Choice.SPOCK,
    angle: 288,
  },
];
