const apiUrl = import.meta.env.VITE_API_URL;

const getOptions = (options?: RequestInit) => {
  return {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };
};

const handleResponse = (res: Response) => {
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const apiService = {
  get(path: string, options?: RequestInit) {
    return fetch(`${apiUrl}${path}`, {
      method: 'GET',
      ...getOptions(options),
    })
      .then((res: Response) => {
        return handleResponse(res);
      })
      .catch(err => {
        throw err;
      });
  },

  post(path: string, options?: RequestInit) {
    return fetch(`${apiUrl}${path}`, {
      method: 'POST',
      ...getOptions(options),
    })
      .then((res: Response) => {
        return handleResponse(res);
      })
      .catch(err => {
        throw err;
      });
  },
};
