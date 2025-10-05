import type { FC } from 'react';

import { PlayerComputerInGame } from '@/components/player';
import { Loader } from '@/components/loader';
import { choiceOptions } from '@/shared/choice-options';
import type { ComputerSideProps } from './computer-side.props';

export const ComputerSide: FC<ComputerSideProps> = ({ gameStarted, loaderText, computerChoice }) => {
  if (computerChoice)
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-[250px] h-[250px] p-4 border-4 border-white bg-secondary rounded-full animate__animated animate__bounceIn 2xl:w-[350px] 2xl:h-[350px]">
        <img
          src={choiceOptions[computerChoice].image}
          alt={computerChoice}
          className="h-[150px] drop-shadow-md 2xl:h-[250px]"
        />
        <h3 className="text-2xl text-shadow-md capitalize 2xl:text-3xl">{computerChoice}</h3>
      </div>
    );

  return (
    <>
      <PlayerComputerInGame showAsThumbnail={gameStarted} animateShake={!gameStarted} />
      {gameStarted && <Loader text={loaderText} />}
    </>
  );
};
