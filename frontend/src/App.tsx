import { Game } from './components/game';
import { ErrorBoundary } from './components/error-boundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  );
};
