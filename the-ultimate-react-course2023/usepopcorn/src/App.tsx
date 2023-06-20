import { useState } from 'react';

type MovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating?: number;
  userRating?: number;
  runtime?: number;
};

const tempMovieData: MovieData[] = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData: MovieData[] = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const App = function (): JSX.Element {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
};

const NavBar = function (): JSX.Element {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <NumResults />
    </nav>
  );
};

const Logo = function (): JSX.Element {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const SearchBar = function (): JSX.Element {
  const [query, setQuery] = useState('');

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

const NumResults = function (): JSX.Element {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
};

const Main = function (): JSX.Element {
  return (
    <main className="main">
      <ListBox />
      <WatchBox />
    </main>
  );
};

const ListBox = function (): JSX.Element {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>

      {isOpen1 && <MovieList />}
    </div>
  );
};

const MovieList = function (): JSX.Element {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
};

type MovieItemProps = {
  movie: MovieData;
};

const MovieItem = function ({ movie }: MovieItemProps): JSX.Element {
  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const WatchBox = function (): JSX.Element {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watchedList={watched} />
          <WatchedMovieList watchedList={watched} />
        </>
      )}
    </div>
  );
};

type WatchedSummaryProps = {
  watchedList: MovieData[];
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

type WatchedMovieListProps = {
  watchedList: MovieData[];
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

type WatchedMovieItemProps = {
  movie: MovieData;
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

