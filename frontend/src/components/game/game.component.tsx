import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button';
import { PlayerPerson, PlayerComputer } from '@/components/player';
import { getCssVariable } from '@/helpers/css-variables';
import { Choices } from '@/components/choices';

import styles from './game.module.scss';

export const Game = () => {
  const [showStartButton, setShowStartButton] = useState(true);
  const [game, setGame] = useState({
    started: false,
  });

  const startGame = () => {
    setGame({ ...game, started: true });
    setTimeout(() => setShowStartButton(false), parseInt(getCssVariable('--btn-animate-duration')));
  };

  return (
    <main className={clsx(styles.gameContainer, 'w-full h-screen flex flex-col overflow-hidden relative lg:flex-row')}>
      <section className={clsx(styles.leftSection, 'w-full h-full flex items-center justify-center lg:w-1/2 relative')}>
        <PlayerPerson showAsThumbnail={game.started} animateShake={!game.started} />
        {game.started && <Choices />}
      </section>
      <section
        className={clsx(styles.rightSection, 'w-full h-full flex items-center justify-center lg:w-1/2 relative')}
      >
        <PlayerComputer showAsThumbnail={game.started} animateShake={!game.started} />
      </section>
      {showStartButton && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
          <Button onClick={startGame}>Start Game</Button>
        </div>
      )}
    </main>
  );
};
