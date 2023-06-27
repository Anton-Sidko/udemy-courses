import { WatchedMovieListProps } from '../types';
import WatchedMovieItem from './WatchedMovieItem';

const WatchedMovieList = function ({
  watchedList,
  onDeleteWatched,
}: WatchedMovieListProps): JSX.Element {
  return (
    <ul className="list">
      {watchedList.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
