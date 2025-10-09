import { useEffect, useState } from 'react';

import { Choice } from '@/types/choice';

export const useChoices = () => {
  const [data, setData] = useState<Choice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Static choices data - no backend call
        const staticChoices = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS, Choice.LIZARD, Choice.SPOCK];

        // Ensure minimum 3 seconds loading time to show the loader properly to the user
        await new Promise(resolve => setTimeout(resolve, 3000));

        setData(staticChoices);
      } catch (err) {
        console.log('Catch Error', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Data', data);
  console.log('Loading', loading);
  console.log('Error', error);

  return { data, loading, error };
};
