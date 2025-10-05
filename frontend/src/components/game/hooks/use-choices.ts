import { apiService } from '@/shared/api-service';
import { useFetch } from '@/shared/use-fetch';
import type { Choice } from '@/types/choice';

export const useChoices = () => {
  const fetchChoices = async (): Promise<Choice[]> => {
    const [data] = await Promise.all([
      apiService.get('/game/choices'),
      new Promise(resolve => setTimeout(resolve, 3000)), // Ensure minimum 3 seconds loading time to show the loader properly to the user
    ]);

    return data;
  };

  return useFetch<Choice[]>(fetchChoices);
};
