import { WatchedSummaryProps } from '../types';
import { average } from '../App';

const WatchedSummary = function ({
  watchedList,
}: WatchedSummaryProps): JSX.Element {
  const avgImdbRating = average(
    watchedList.map((movie) => movie.imdbRating ?? 0)
  );
  const avgUserRating = average(
    watchedList.map((movie) => movie.userRating ?? 0)
  );
  const sumRuntime = watchedList.reduce(
    (sum, movie) => sum + (movie.runtime ?? 0),
    0
  );

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
          <span>{sumRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
