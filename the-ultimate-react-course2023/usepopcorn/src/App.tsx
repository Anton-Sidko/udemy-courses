import { useEffect, useState } from 'react';

import {
  MovieData,
  MovieDetailsProps,
  MovieDetailsType,
  WatchedMovieItemProps,
  WatchedMovieListProps,
  WatchedSummaryProps,
} from './types';

import Main from './layout/Main';
import StarRating from './components/StarRating';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './layout/NavBar';
import SearchBar from './components/SearchBar';
import NumResults from './components/NumResults';
import MovieBox from './components/MovieBox';
import MovieList from './components/MovieList';

// const tempMovieData: MovieData[] = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt0133093',
//     Title: 'The Matrix',
//     Year: '1999',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt6751668',
//     Title: 'Parasite',
//     Year: '2019',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
//   },
// ];

// const tempWatchedData: MovieData[] = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = '7f28e518';

const App = function (): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('big bang');
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [watched, setWatched] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<null | string>(null);

  useEffect(() => {
    const fetchMovies = async (query: string) => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }
        setMovies(data.Search);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies(searchQuery);
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
            />
          ) : (
            <>
              <WatchedSummary watchedList={watched} />
              <WatchedMovieList watchedList={watched} />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
};

const MovieDetails = function ({
  selectedId,
  onCloseMovie,
}: MovieDetailsProps): React.JSX.Element {
  const [movie, setMovie] = useState<MovieDetailsType | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie as MovieDetailsType;

  useEffect(() => {
    const getMovieDetails = async function (id: string) {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails(selectedId);
  }, [selectedId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}{' '}
      {!isLoading && !error && (
        <div className="details">
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${title} movie`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
              />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

const WatchedSummary = function ({
  watchedList,
}: WatchedSummaryProps): JSX.Element {
  const avgImdbRating = average(
    watchedList.map((movie) => movie.imdbRating ?? 0)
  );
  const avgUserRating = average(
    watchedList.map((movie) => movie.userRating ?? 0)
  );
  const avgRuntime = average(watchedList.map((movie) => movie.runtime ?? 0));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedList.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMovieList = function ({
  watchedList,
}: WatchedMovieListProps): JSX.Element {
  return (
    <ul className="list">
      {watchedList.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
};

const WatchedMovieItem = function ({ movie }: WatchedMovieItemProps) {
  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating ?? '-'}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating ?? '-'}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime ?? '-'} min</span>
        </p>
      </div>
    </li>
  );
};

export default App;

