import type { PlayResponse } from '@/types/play';
import { getRandomNumberUpTo } from '@/helpers/random-number';

const determineWinner = (player: number, computer: number): 'win' | 'lose' | 'tie' => {
  if (player === computer) return 'tie';

  const winConditions: Record<number, number[]> = {
    1: [3, 4], // Rock beats Scissors and Lizard
    2: [1, 5], // Paper beats Rock and Spock
    3: [2, 4], // Scissors beats Paper and Lizard
    4: [2, 5], // Lizard beats Paper and Spock
    5: [1, 3], // Spock beats Rock and Scissors
  };

  return winConditions[player]?.includes(computer) ? 'win' : 'lose';
};

export const playMove = (playerMove: number): PlayResponse => {
  const computer = getRandomNumberUpTo(5);
  const result = determineWinner(playerMove, computer);

  return {
    player: playerMove,
    computer,
    result,
  };
};
