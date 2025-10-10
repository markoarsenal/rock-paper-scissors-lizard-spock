import { useCallback, useEffect, useRef, useState, Activity } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button';
import { PlayerPersonInGame } from '@/components/player';
import { getCssVariable } from '@/helpers/css-variables';
import { Choices } from '@/components/choices';
import { Loader } from '@/components/loader';
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
import RefreshIcon from '@/assets/icons/rotate.svg?react';
import { useKeyboardControls } from './hooks/use-keyboard-controls';

import styles from './game.module.scss';

export const Game = () => {
  const choices = Object.values(choiceOptions);

  const [loadingGame, setLoadingGame] = useState(false);
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

  useEffect(() => {
    const timeout = setTimeout(() => setLoadingGame(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

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

    // New round after 2 seconds
    newRoundTimeout.current = setTimeout(() => {
      setRoundNumber(prev => prev + 1);
      setPlayerChoice(undefined);
      setComputerChoice(undefined);
      setRoundResult(undefined);
    }, 2000);
  };

  const resetGame = () => {
    if (newRoundTimeout.current) clearTimeout(newRoundTimeout.current);

    setRoundNumber(1);
    setRoundResult(undefined);
    setRoundResults([]);
    setPlayerChoice(undefined);
    setComputerChoice(undefined);
  };

  const clickResetButton = useCallback(() => resetButtonRef.current?.click(), []);

  useKeyboardControls({ onGameStart: clickStartButton, onGameReset: clickResetButton });

  return (
    <>
      <Activity mode={!loadingGame ? 'visible' : 'hidden'}>
        <div className="flex justify-center items-center h-full">
          <Loader text="Loading game..." />
        </div>
      </Activity>

      <Activity mode={loadingGame ? 'visible' : 'hidden'}>
        <main className="w-full h-full flex flex-col overflow-hidden relative lg:flex-row">
          <section
            className={clsx(
              styles.leftSection,
              'w-full h-1/2 flex items-center justify-center relative lg:w-1/2 lg:h-full',
            )}
          >
            <PlayerPersonInGame showAsThumbnail={gameStarted} animateShake={!gameStarted} />
            {gameStarted && <Choices value={playerChoice} onSelect={handleChoice} />}
          </section>
          {roundResult && (
            <RoundResult
              result={roundResult}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:top-1/4"
            />
          )}
          {gameStarted && !computerChoice && !showStartButton && (
            <RoundIndicator
              roundNumber={roundNumber}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:top-1/4"
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

          <div className="absolute bottom-0 p-4 gap-8 justify-between items-center w-full hidden lg:flex">
            <p className="text-shadow-sm">
              Press <span className="text-2xl px-1">Enter</span> to start game and{' '}
              <span className="text-2xl px-1">Backspace</span> to reset game. Use{' '}
              <span className="text-2xl px-1">1-5</span> to select exact choice or{' '}
              <span className="text-2xl px-1">Space</span> to randomize.
            </p>
            {gameStarted && (
              <Button size="small" onClick={resetGame} ref={resetButtonRef}>
                Reset Game
                <RefreshIcon width={20} height={20} />
              </Button>
            )}
          </div>
        </main>
      </Activity>
    </>
  );
};
