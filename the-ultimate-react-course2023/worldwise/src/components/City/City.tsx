import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCities } from '../../contexts/CitiesContext';
import { flagEmojiToPNG, formatDate } from '../../utils';

import styles from './City.module.css';
import Spinner from '../Spinner/Spinner';
import BackButton from '../Button/BackButton';

const City = function (): React.JSX.Element {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();

  useEffect(() => {
    if (id) getCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (currentCity === null) return <h1>No city data</h1>;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;

