import type { FC } from 'react';

import { HistoryItem } from './components/history-item';
import type { ScoreHistoryProps } from './score-history.props';

export const ScoreHistory: FC<ScoreHistoryProps> = ({ roundResults }) => {
  const results = [...roundResults];
  const last10Results = results.reverse();
  const playerScore = results.filter(({ result }) => result === 'win').length;
  const computerScore = results.filter(({ result }) => result === 'lose').length;

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto px-4 py-8 text-gray-700">
      <h2 className="text-3xl font-bold text-center">Score History</h2>
      <p className="text-2xl font-bold text-center text-gray-400">
        <span className="text-main">{playerScore}</span> : <span className="text-secondary">{computerScore}</span>
      </p>
      {last10Results.length > 0 ? (
        <div className="flex flex-col gap-6 mt-8 lg:gap-1">
          {last10Results.map(roundResult => (
            <HistoryItem key={roundResult.roundNumber} roundResult={roundResult} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-lg font-bold text-center text-gray-400">No scores yet</p>
      )}
    </div>
  );
};
