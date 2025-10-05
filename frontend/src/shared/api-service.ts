const apiUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const apiService = {
  get(path: string, options?: RequestInit) {
    return fetch(`${apiUrl}${path}`, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
      ...options,
    }).then((res: Response) => res.json());
  },

  post(path: string, options?: RequestInit) {
    return fetch(`${apiUrl}${path}`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
      ...options,
    }).then((res: Response) => res.json());
  },
};
