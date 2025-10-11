import type { FC } from 'react';
import clsx from 'clsx';

import { PlayerComputerInGame } from '@/components/player';
import { Loader } from '@/components/loader';
import { choiceOptions } from '@/shared/choice-options';
import type { ComputerSideProps } from './computer-side.props';

export const ComputerSide: FC<ComputerSideProps> = ({ gameStarted, loaderText, computerChoice }) => {
  return (
    <>
      <PlayerComputerInGame showAsThumbnail={gameStarted} animateShake={!gameStarted} />
      {gameStarted && !computerChoice && <Loader text={loaderText} />}
      {computerChoice && (
        <div
          className={clsx(
            'flex flex-col items-center justify-center gap-2 w-[200px] h-[200px] p-4 border-4 border-black bg-secondary rounded-full shadow-default animate__animated animate__bounceIn',
            'lg:w-[250px] lg:h-[250px]',
            '2xl:w-[350px] 2xl:h-[350px] 2xl:border-6',
          )}
        >
          <img
            src={choiceOptions[computerChoice].image}
            alt={computerChoice}
            className="h-[120px] drop-shadow-md lg:h-[150px] 2xl:h-[230px]"
          />
          <h3 className="text-xl text-black text-shadow-md capitalize lg:text-2xl 2xl:text-3xl">{computerChoice}</h3>
        </div>
      )}
    </>
  );
};
