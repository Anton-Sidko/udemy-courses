import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { convertToEmoji, flagFromCode } from '../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CityType } from '../../types';
import { useCities } from '../../contexts/CitiesContext';

import Button from '../Button/Button';
import BackButton from '../Button/BackButton';
import styles from './Form.module.css';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = function (): React.JSX.Element {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (lat === null || lng === null) return;

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
        setEmoji(convertToEmoji(data.countryCode) || ' ');
      } catch (error) {
        setGeocodingError((error as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity: CityType = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app/cities');
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (lat === null || lng === null)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`.trim()}
      onSubmit={handleSubmit}
    >
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
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date || new Date())}
          dateFormat="dd/MM/yyyy"
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

