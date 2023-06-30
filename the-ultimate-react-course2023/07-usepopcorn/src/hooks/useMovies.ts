import { useEffect, useState } from 'react';

import { API_KEY } from '../const';
import { MovieData } from '../types';

export const useMovies = function (searchQuery: string, callback?: () => void) {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async (query: string) => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }
        setMovies(data.Search);
        setError('');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    // callback?.();
    fetchMovies(searchQuery);

    return function () {
      controller.abort();
    };
  }, [searchQuery]);

  return { movies, isLoading, error };
};
