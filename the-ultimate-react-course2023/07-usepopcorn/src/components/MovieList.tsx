import { MovieListProps } from '../types';
import MovieItem from './MovieItem';

const MovieList = function ({
  movies,
  onSelectMovie,
}: MovieListProps): JSX.Element {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
