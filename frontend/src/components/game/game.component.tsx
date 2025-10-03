import clsx from 'clsx';

import player from '../../assets/images/player-person.png';
import computer from '../../assets/images/player-computer.png';
import { Button } from '../button';

import styles from './game.module.scss';

export const Game = () => {
  return (
    <main className={clsx(styles.gameContainer, 'w-full h-screen flex flex-col overflow-hidden relative lg:flex-row')}>
      <section className={clsx(styles.leftSection, 'w-full h-full flex items-center justify-center lg:w-1/2')}>
        <div className="h-1/2 max-h-[500px] animate__animated animate__bounceIn lg:w-1/2 lg:max-w-[400px] lg:h-auto lg:max-h-none">
          <img
            src={player}
            alt="Player"
            className={clsx('h-full animate__animated animate__headShake animate__infinite', styles.player)}
          />
        </div>
      </section>
      <section className={clsx(styles.rightSection, 'w-full h-full flex items-center justify-center lg:w-1/2')}>
        <div className="h-1/2 max-h-[500px] animate__animated animate__bounceIn lg:w-1/2 lg:max-w-[400px] lg:h-auto lg:max-h-none">
          <img
            src={computer}
            alt="Computer"
            className={clsx('h-full animate__animated animate__headShake animate__infinite', styles.computer)}
          />
        </div>
      </section>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
        <Button>Start Game</Button>
      </div>
    </main>
  );
};
