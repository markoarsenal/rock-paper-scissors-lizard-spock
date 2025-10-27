import { useCallback, useEffect, useRef, useState, Activity } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button';
import { PlayerPersonInGame } from '@/components/player';
import { getCssVariable } from '@/helpers/css-variables';
import { Choices } from '@/components/choices';
import PlayIcon from '@/assets/icons/media-play.svg?react';
import { ScoreLine } from '@/components/score-line';
import { Choice } from '@/types/choice';
import { playMove } from './helpers';
import { choiceOptions } from '@/shared/choice-options';
import { ComputerSide } from '@/components/computer-side';
import type { PlayResult } from '@/types/play';
import { RoundResult } from '@/components/round-result';
import { RoundIndicator } from '@/components/round-indicator';
import type { RoundResultType } from './game.props';
import { Footer } from '@/components/footer';
import { useKeyboardControls } from './hooks/use-keyboard-controls';

import styles from './game.module.scss';
import { WinsChoose } from '../wins-choose';

export const Game = () => {
  const choices = Object.values(choiceOptions);

  const [numberOfWins, setNumberOfWins] = useState<number>(0);
  const [showInitialScreen, setShowInitialScreen] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<Choice>();
  const [computerChoice, setComputerChoice] = useState<Choice>();
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundResult, setRoundResult] = useState<PlayResult>();
  const [roundResults, setRoundResults] = useState<RoundResultType[]>([]);

  const startButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const newRoundTimeout = useRef<number | null>(null);

  const startGame = () => {
    setGameStarted(true);
    setTimeout(() => setShowStartButton(false), parseInt(getCssVariable('--btn-animate-duration')));
  };

  const clickStartButton = useCallback(() => startButtonRef.current?.click(), []);

  const handleChoice = (choice: Choice) => {
    if (playerChoice) return;

    setPlayerChoice(choice);

    const playResult = playMove(choiceOptions[choice].value);

    setComputerChoice(choices.find(({ value }) => value === playResult.computer)?.name);
    setRoundResult(playResult.result);
    setRoundResults(prev => [...prev, { ...playResult, roundNumber: roundNumber }]);

    // New round after 2.5 seconds
    newRoundTimeout.current = setTimeout(() => {
      setRoundNumber(prev => prev + 1);
      setPlayerChoice(undefined);
      setComputerChoice(undefined);
      setRoundResult(undefined);
    }, 2500);
  };

  const resetGame = useCallback(() => {
    if (newRoundTimeout.current) clearTimeout(newRoundTimeout.current);

    setRoundNumber(1);
    setRoundResult(undefined);
    setRoundResults([]);
    setPlayerChoice(undefined);
    setComputerChoice(undefined);
  }, []);

  const clickResetButton = useCallback(() => resetButtonRef.current?.click(), []);

  useKeyboardControls({ onGameStart: clickStartButton, onGameReset: clickResetButton });

  useEffect(() => {
    return () => {
      if (newRoundTimeout.current) clearTimeout(newRoundTimeout.current);
    };
  }, []);

  const numberOfWinsHandler = (numberOfWins: number) => {
    setNumberOfWins(numberOfWins);
    setTimeout(() => setShowInitialScreen(true), 1000);
  };

  return (
    <>
      <Activity mode={!showInitialScreen ? 'visible' : 'hidden'}>
        <WinsChoose numberOfWins={numberOfWins} setNumberOfWins={numberOfWinsHandler} />
      </Activity>

      <Activity mode={showInitialScreen ? 'visible' : 'hidden'}>
        <main className="w-full h-full flex flex-col overflow-y-hidden relative lg:flex-row lg:overflow-hidden">
          <section
            className={clsx(
              styles.leftSection,
              'w-full h-1/2 flex items-center justify-center relative lg:w-1/2 lg:h-full',
            )}
          >
            <PlayerPersonInGame showAsThumbnail={gameStarted} animateShake={!gameStarted} />
            {gameStarted && (
              <Choices value={playerChoice} onSelect={handleChoice} clickDisabled={Boolean(playerChoice)} />
            )}
          </section>
          {roundResult && (
            <RoundResult
              result={roundResult}
              className="absolute top-1/2 left-1/2 mt-1 -translate-x-1/2 -translate-y-1/2 z-10 lg:top-1/4 lg:mt-0"
            />
          )}
          {gameStarted && !computerChoice && !showStartButton && (
            <RoundIndicator
              roundNumber={roundNumber}
              className="absolute top-1/2 left-1/2 mt-1 -translate-x-1/2 -translate-y-1/2 z-10 lg:top-1/4 lg:mt-0"
            />
          )}
          <section
            className={clsx(
              styles.rightSection,
              'w-full h-1/2 flex items-center justify-center relative lg:w-1/2 lg:h-full',
            )}
          >
            <ComputerSide
              gameStarted={gameStarted}
              loaderText="Computer is waiting for your move..."
              computerChoice={computerChoice}
            />
          </section>

          {showStartButton && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
              <Button onClick={startGame} ref={startButtonRef}>
                Start Game <PlayIcon width={32} height={32} />
              </Button>
            </div>
          )}
          {gameStarted && <ScoreLine roundResults={roundResults} />}

          <Footer gameStarted={gameStarted} onReset={resetGame} resetButtonRef={resetButtonRef} />
        </main>
      </Activity>
    </>
  );
};
