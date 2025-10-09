import { useState } from 'react';

import type { PlayResponse } from '@/types/play';

export const usePlayMove = (onSuccess?: (response: PlayResponse) => void, onError?: (error: Error) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const playMove = async (move: number) => {
    setLoading(true);
    setError(undefined);

    try {
      // TODO: Replace with new logic
      // Placeholder game logic - no backend call
      const computer = Math.floor(Math.random() * 5) + 1; // Random number 1-5

      // Placeholder result - always returns 'tie' for now
      const response: PlayResponse = {
        player: move,
        computer,
        result: 'tie',
      };

      onSuccess?.(response);
      return response;
    } catch (error) {
      onError?.(error as Error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    playMove,
  };
};
