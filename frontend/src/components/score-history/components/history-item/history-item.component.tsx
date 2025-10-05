import type { FC } from 'react';

import { PlayerPerson, PlayerComputer } from '@/components/player';
import type { HistoryItemProps } from './history-item.props';
import { choiceOptions } from '@/shared/choice-options';

export const HistoryItem: FC<HistoryItemProps> = ({ playerChoice, computerChoice, result, round }) => {
  const choicePlayer = choiceOptions.find(choice => choice.value === playerChoice);
  const choiceComputer = choiceOptions.find(choice => choice.value === computerChoice);

  return (
    <div className="flex justify-between items-center">
      <PlayerPerson showAsThumbnail animateShake={false} className="scale-75 !border-2 !border-black" />
      <div className="flex justify-between items-center flex-grow h-16 px-4 py-2 rounded-lg bg-gray-200 relative">
        <div className="flex gap-2 justify-center items-center">
          <img src={choicePlayer?.image} alt="Spock" className="h-10" />
          <p className="text-main text-center">{choicePlayer?.label}</p>
        </div>
        <div>
          <p className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 text-sm text-gray-500 text-center text-nowrap">
            Round {round}
          </p>
          {result === 'win' && <h3 className="text-2xl font-bold text-center text-green-500">Win</h3>}
          {result === 'lose' && <h3 className="text-2xl font-bold text-center text-red-600">Lose</h3>}
          {result === 'draw' && <h3 className="text-2xl font-bold text-center text-yellow-500">Draw</h3>}
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p className="text-secondary text-center">{choiceComputer?.label}</p>
          <img src={choiceComputer?.image} alt="Lizard" className="h-10" />
        </div>
      </div>
      <PlayerComputer showAsThumbnail animateShake={false} className="scale-75 !border-2 !border-black" />
    </div>
  );
};
