import { useEffect, useState } from 'react';
import { MovieData, MovieDetailsProps, MovieDetailsType } from '../types';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { API_KEY } from '../App';

const MovieDetails = function ({
  selectedId,
  onCloseMovie,
  onAddWatch,
  watched,
}: MovieDetailsProps): React.JSX.Element {
  const [movie, setMovie] = useState<MovieDetailsType | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
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
    const controller = new AbortController();

    const getMovieDetails = async function (id: string) {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setMovie(data);
        setError('');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails(selectedId);

    return function () {
      controller.abort();
    };
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = 'usePopcorn project';
    };
  }, [title]);

  useEffect(() => {
    const handleKeydown = function (e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return function () {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseMovie]);

  const handleAdd = function () {
    const newWatchedMovie: MovieData = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(' ').at(0)),
    };

    onAddWatch(newWatchedMovie);
    onCloseMovie();
  };

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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      +Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You've already rated this movie as {watchedUserRating}{' '}
                  <span>🌟</span>
                </p>
              )}
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

export default MovieDetails;
