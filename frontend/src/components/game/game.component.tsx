import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button';
import { PlayerPerson, PlayerComputer } from '@/components/player';
import { getCssVariable } from '@/helpers/css-variables';
import { Choice, Choices } from '@/components/choices';
import { Loader } from '@/components/loader';
import PlayIcon from '@/assets/icons/media-play.svg?react';
import { type GameState, LoaderText } from './game.props';

import styles from './game.module.scss';

export const Game = () => {
  const [showStartButton, setShowStartButton] = useState(true);
  const [game, setGame] = useState<GameState>({
    started: false,
    choice: undefined,
  });
  const [loaderText, setLoaderText] = useState(LoaderText.COMPUTER_WAITING);

  const startGame = () => {
    setGame({ ...game, started: true });
    setTimeout(() => setShowStartButton(false), parseInt(getCssVariable('--btn-animate-duration')));
  };

  const handleChoice = (choice: Choice) => {
    if (game.choice) return;
    setGame({ ...game, choice: choice });
    setLoaderText(LoaderText.COMPUTER_MAKING_MOVE);
  };

  return (
    <main className="w-full h-screen flex flex-col overflow-hidden relative lg:flex-row">
      <section className={clsx(styles.leftSection, 'w-full h-full flex items-center justify-center lg:w-1/2 relative')}>
        <PlayerPerson showAsThumbnail={game.started} animateShake={!game.started} />
        {game.started && <Choices value={game.choice} onSelect={handleChoice} />}
      </section>
      <section
        className={clsx(styles.rightSection, 'w-full h-full flex items-center justify-center lg:w-1/2 relative')}
      >
        <PlayerComputer showAsThumbnail={game.started} animateShake={!game.started} />
        {game.started && <Loader text={loaderText} />}
      </section>
      {showStartButton && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
          <Button onClick={startGame}>
            Start Game <PlayIcon width={32} height={32} />
          </Button>
        </div>
      )}
    </main>
  );
};
