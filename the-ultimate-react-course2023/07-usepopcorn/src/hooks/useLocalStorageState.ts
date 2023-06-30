import { useEffect, useState } from 'react';
import { MovieData } from '../types';

export const useLocalStorageState = function (initialState = [], key: string) {
  const [value, setValue] = useState<MovieData[]>(function () {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};
