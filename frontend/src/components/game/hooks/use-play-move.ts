import { apiService } from '@/shared/api-service';
import { useState } from 'react';
import type { PlayResult } from '@/types/play';

export type PlayResponse = {
  result: PlayResult;
  player: number;
  computer: number;
};

export const usePlayMove = (onSuccess?: (response: PlayResponse) => void, onError?: (error: Error) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const playMove = async (move: number) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await apiService.post('/game/play', { body: JSON.stringify({ player: move }) });
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
