import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button';
import { PlayerPersonInGame } from '@/components/player';
import { getCssVariable } from '@/helpers/css-variables';
import { Choices } from '@/components/choices';
import { Loader } from '@/components/loader';
import PlayIcon from '@/assets/icons/media-play.svg?react';
import { LoaderText } from './game.props';
import { ScoreLine } from '@/components/score-line';
import { Choice } from '@/types/choice';
import { useChoices } from './hooks/use-choices';
import { LoadingError } from '@/components/loading-error';
import { usePlayMove } from './hooks/use-play-move';
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

  const [showStartButton, setShowStartButton] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<Choice>();
  const [computerChoice, setComputerChoice] = useState<Choice>();
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundResult, setRoundResult] = useState<PlayResult>();
  const [roundResults, setRoundResults] = useState<RoundResultType[]>([]);
  const [loaderText, setLoaderText] = useState(LoaderText.COMPUTER_WAITING);

  const newRoundTimeout = useRef<number | null>(null);

  const { loading: choicesLoading, error: choicesError } = useChoices();
  const { playMove } = usePlayMove(playResult => {
    setComputerChoice(choices.find(({ value }) => value === playResult.computer)?.name);
    setRoundResult(playResult.result);
    setRoundResults(prev => [...prev, { ...playResult, roundNumber: roundNumber }]);

    // New round after 2 seconds
    newRoundTimeout.current = setTimeout(() => {
      setRoundNumber(prev => prev + 1);
      setPlayerChoice(undefined);
      setComputerChoice(undefined);
      setRoundResult(undefined);
      setLoaderText(LoaderText.COMPUTER_WAITING);
    }, 2000);
  });

  const startGame = useCallback(() => {
    setGameStarted(true);
    setTimeout(() => setShowStartButton(false), parseInt(getCssVariable('--btn-animate-duration')));
  }, []);

  const handleChoice = (choice: Choice) => {
    if (playerChoice) return;

    setPlayerChoice(choice);
    setLoaderText(LoaderText.COMPUTER_MAKING_MOVE);
    playMove(choiceOptions[choice].value);
  };

  const resetGame = useCallback(() => {
    if (newRoundTimeout.current) clearTimeout(newRoundTimeout.current);

    setRoundNumber(1);
    setRoundResult(undefined);
    setRoundResults([]);
    setPlayerChoice(undefined);
    setComputerChoice(undefined);
    setLoaderText(LoaderText.COMPUTER_WAITING);
  }, []);

  useKeyboardControls({ onGameStart: startGame, onGameReset: resetGame });

  if (choicesError)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingError />
      </div>
    );

  return choicesLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader text={LoaderText.DATA_LOADING} />
    </div>
  ) : (
    <main className="w-full h-screen flex flex-col overflow-hidden relative lg:flex-row">
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
        <ComputerSide gameStarted={gameStarted} loaderText={loaderText} computerChoice={computerChoice} />
      </section>

      {showStartButton && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
          <Button onClick={startGame}>
            Start Game <PlayIcon width={32} height={32} />
          </Button>
        </div>
      )}
      {gameStarted && <ScoreLine roundResults={roundResults} />}

      <div className="absolute bottom-0 p-4 gap-8 justify-between items-center w-full hidden lg:flex">
        <p className="text-shadow-sm">
          Press <span className="text-2xl px-1">Enter</span> to start game and{' '}
          <span className="text-2xl px-1">Backspace</span> to reset game. Use <span className="text-2xl px-1">1-5</span>{' '}
          to select exact choice or <span className="text-2xl px-1">Space</span> to randomize.
        </p>
        {gameStarted && (
          <Button size="small" onClick={resetGame}>
            Reset Game
            <RefreshIcon width={20} height={20} />
          </Button>
        )}
      </div>
    </main>
  );
};
