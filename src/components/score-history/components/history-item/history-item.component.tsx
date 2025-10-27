import type { FC } from 'react';
import clsx from 'clsx';

import { PlayerPerson, PlayerComputer } from '@/components/player';
import type { HistoryItemProps } from './history-item.props';
import { choiceOptions } from '@/shared/choice-options';

export const HistoryItem: FC<HistoryItemProps> = ({ roundResult }) => {
  const choices = Object.values(choiceOptions);
  const choicePlayer = choices.find(choice => choice.value === roundResult.player);
  const choiceComputer = choices.find(choice => choice.value === roundResult.computer);

  const commonClassNames = 'text-2xl font-bold text-center';

  return (
    <div className="flex justify-between items-center">
      <PlayerPerson showAsThumbnail animateShake={false} className="scale-90 !border-2 !border-main-dark" />
      <div className="flex justify-between items-center flex-grow h-12 mx-2 px-4 py-2 rounded-lg bg-gray-200 relative lg:h-16">
        <div className="w-1/3 flex gap-2 justify-center items-center">
          <img src={choicePlayer?.image} alt="Spock" className="h-8 lg:h-10" />
          <p className="text-main text-center max-lg:hidden">{choicePlayer?.label}</p>
        </div>
        <div className="w-1/3">
          <p className="absolute bottom-full left-1/2 -translate-x-1/2 text-sm text-gray-500 text-center text-nowrap lg:mb-1">
            Round {roundResult.roundNumber}
          </p>
          {roundResult.result === 'win' && <h3 className={clsx('text-green-500', commonClassNames)}>Win</h3>}
          {roundResult.result === 'lose' && <h3 className={clsx('text-red-600', commonClassNames)}>Lose</h3>}
          {roundResult.result === 'tie' && <h3 className={clsx('text-yellow-500', commonClassNames)}>Tie</h3>}
        </div>
        <div className="w-1/3 flex gap-2 justify-center items-center">
          <p className="text-secondary text-center max-lg:hidden">{choiceComputer?.label}</p>
          <img src={choiceComputer?.image} alt="Lizard" className="h-8 lg:h-10" />
        </div>
      </div>
      <PlayerComputer showAsThumbnail animateShake={false} className="scale-90 !border-2 !border-secondary-dark" />
    </div>
  );
};
