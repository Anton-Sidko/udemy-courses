import { useEffect, useState } from 'react';

import { MovieData } from './types';

import Main from './layout/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './layout/NavBar';
import SearchBar from './components/SearchBar';
import NumResults from './components/NumResults';
import MovieBox from './components/MovieBox';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import MovieDetails from './components/MovieDetails';

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);

export const API_KEY = '7f28e518';

const App = function (): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [watched, setWatched] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<null | string>(null);

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

    handleCloseMovie();
    fetchMovies(searchQuery);

    return function () {
      controller.abort();
    };
  }, [searchQuery]);

  const handleSearchInput = function (searchQuery: string) {
    setSearchQuery(searchQuery);
  };

  const handleSelectMovie = function (id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = function () {
    setSelectedId(null);
  };

  const handleAddWatch = function (newWatchedMovie: MovieData) {
    setWatched((watched) => [...watched, newWatchedMovie]);
  };

  const handleDeleteWatched = function (id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <SearchBar
          query={searchQuery}
          onSetQuery={handleSearchInput}
        />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <MovieBox>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
        </MovieBox>

        <MovieBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watchedList={watched} />
              <WatchedMovieList
                watchedList={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
};

export default App;

