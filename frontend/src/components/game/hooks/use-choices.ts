import { useEffect, useState } from 'react';

import { apiService } from '@/shared/api-service';
import type { Choice } from '@/types/choice';

export const useChoices = () => {
  const [data, setData] = useState<Choice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [data] = await Promise.all([
          apiService.get('/game/choices'),
          new Promise(resolve => setTimeout(resolve, 3000)), // Ensure minimum 3 seconds loading time to show the loader properly to the user
        ]);

        setData(data);
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
