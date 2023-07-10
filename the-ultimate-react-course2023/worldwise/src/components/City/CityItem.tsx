import { Link } from 'react-router-dom';

import { useCities } from '../../contexts/CitiesContext';
import { CityType } from '../../types';
import { flagEmojiToPNG, formatDate } from '../../utils';

import styles from './CityItem.module.css';

const CityItem = function ({ city }: { city: CityType }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles['cityItem--active'] : ''
        }`.trim()}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
