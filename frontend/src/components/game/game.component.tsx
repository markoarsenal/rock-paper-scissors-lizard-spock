import clsx from "clsx";

import player from "../../assets/images/player-person.png";
import computer from "../../assets/images/player-computer.png";
import { Button } from "../button";

import styles from "./game.module.scss";

export const Game = () => {
  return (
    <main
      className={clsx(
        styles.gameContainer,
        "w-full h-screen flex overflow-hidden relative"
      )}
    >
      <section
        className={clsx(
          styles.leftSection,
          "w-1/2 h-full flex items-center justify-center"
        )}
      >
        <div className="w-1/2 max-w-[400px] animate__animated animate__bounceIn">
          <img
            src={player}
            alt="Player"
            className="w-full animate__animated animate__headShake animate__infinite"
          />
        </div>
      </section>
      <section
        className={clsx(
          styles.rightSection,
          "w-1/2 h-full flex items-center justify-center"
        )}
      >
        <div className="w-1/2 max-w-[400px] animate__animated animate__bounceIn">
          <img
            src={computer}
            alt="Computer"
            className="w-full animate__animated animate__headShake animate__infinite"
          />
        </div>
      </section>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
        <Button>Start Game</Button>
      </div>
    </main>
  );
};
