import { useEffect, useState } from 'react';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { flagFromCode } from '../../utils';

import Button from '../Button/Button';
import BackButton from '../Button/BackButton';
import styles from './Form.module.css';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = function (): React.JSX.Element {
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchCityData = async function () {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setCountryCode(data.countryCode || '');
      } catch (error) {
        setGeocodingError((error as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {countryCode && (
          <span className={styles.flag}>{flagFromCode(countryCode)}</span>
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toLocaleDateString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;

