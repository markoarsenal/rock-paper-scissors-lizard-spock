import { useEffect, useState } from 'react';

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error };
};
