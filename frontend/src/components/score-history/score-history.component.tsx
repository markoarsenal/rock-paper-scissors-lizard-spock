import { choiceOptions } from '@/shared/choice-options';
import { HistoryItem } from './components/history-item';

export const ScoreHistory = () => {
  const choices = Object.values(choiceOptions);

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto px-4 py-8 text-gray-700">
      <h2 className="text-3xl font-bold text-center">Score History</h2>
      <p className="text-xl font-bold text-center text-gray-400">
        <span className="text-main">20</span> : <span className="text-secondary">22</span>
      </p>
      <h3 className="mt-8 text-lg font-bold text-center text-gray-400">The latest 10 scores</h3>
      <div className="flex flex-col gap-2 mt-4">
        {Array.from({ length: 10 }).map((_, index) => {
          const playerChoice = choices[index % 5];
          const computerChoice = choices[index % 4];

          return (
            <HistoryItem
              key={index}
              playerChoice={playerChoice.value}
              computerChoice={computerChoice.value}
              round={index + 1}
              result={index % 3 === 0 ? 'win' : index % 3 === 1 ? 'lose' : 'draw'}
            />
          );
        })}
      </div>
    </div>
  );
};
