import clsx from 'clsx';
import { type FC } from 'react';

import type { WinsChooseProps } from './wins-choose.props';

export const WinsChoose: FC<WinsChooseProps> = ({ numberOfWins, setNumberOfWins }) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 p-4 flex flex-col gap-6 justify-center items-center z-10',
        !numberOfWins && 'animate__animated animate__zoomInDown',
        numberOfWins && 'animate__animated animate__bounceOut',
      )}
    >
      <h3 className="text-2xl font-bold">Choose the number of wins</h3>
      <div className="flex gap-6">
        {[1, 3, 5, 10].map(win => (
          <button
            key={win}
            className={clsx(
              'w-16 h-16 rounded-full border-4 bg-white text-main text-2xl font-bold',
              'transition-all duration-200 hover:scale-110 active:scale-90',
              'shadow-default hover:shadow-secondary',
              !numberOfWins && 'animate__animated animate__pulse animate__infinite',
              numberOfWins === win && 'border-secondary !text-secondary scale-110',
            )}
            onClick={() => setNumberOfWins(win)}
          >
            {win}
          </button>
        ))}
      </div>
    </div>
  );
};
