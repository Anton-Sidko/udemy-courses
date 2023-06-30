import { MovieData } from '../types';

const NumResults = function ({ movies }: { movies: MovieData[] }): JSX.Element {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default NumResults;
