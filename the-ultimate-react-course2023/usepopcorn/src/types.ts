export type MovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating?: number;
  userRating?: number;
  runtime?: number;
};

export type SearchBarProps = {
  query: string;
  onSetQuery: (searchQuery: string) => void;
};

export type ToggleButtonProps = {
  isOpen: boolean;
  onSetIsOpen: () => void;
};

export type MovieListProps = {
  movies: MovieData[];
  onSelectMovie: (id: string) => void;
};

export type MovieItemProps = {
  movie: MovieData;
  onSelectMovie: (id: string) => void;
};

export type MovieDetailsProps = {
  selectedId: string;
  onCloseMovie: () => void;
};

export type MovieDetailsType = MovieData & {
  Runtime: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};

export type WatchedSummaryProps = {
  watchedList: MovieData[];
};

export type WatchedMovieListProps = {
  watchedList: MovieData[];
};

export type WatchedMovieItemProps = {
  movie: MovieData;
};
