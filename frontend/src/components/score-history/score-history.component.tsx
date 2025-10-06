import type { FC } from 'react';

import { HistoryItem } from './components/history-item';
import type { ScoreHistoryProps } from './score-history.props';

export const ScoreHistory: FC<ScoreHistoryProps> = ({ roundResults }) => {
  const last10Results = roundResults.reverse().slice(0, 10);
  const playerScore = roundResults.filter(({ result }) => result === 'win').length;
  const computerScore = roundResults.filter(({ result }) => result === 'lose').length;

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto px-4 py-8 text-gray-700">
      <h2 className="text-3xl font-bold text-center">Score History</h2>
      <p className="text-xl font-bold text-center text-gray-400">
        <span className="text-main">{playerScore}</span> : <span className="text-secondary">{computerScore}</span>
      </p>
      {last10Results.length > 0 ? (
        <>
          <h3 className="mt-8 text-lg font-bold text-center text-gray-400">Latest 10 scores</h3>
          <div className="flex flex-col gap-2 mt-4">
            {last10Results.map(roundResult => (
              <HistoryItem key={roundResult.roundNumber} roundResult={roundResult} />
            ))}
          </div>
        </>
      ) : (
        <p className="mt-8 text-lg font-bold text-center text-gray-400">No scores yet</p>
      )}
    </div>
  );
};
