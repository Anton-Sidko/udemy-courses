import { CityType } from '../../types';
import { flagEmojiToPNG, formatDate } from '../../utils';
import styles from './CityItem.module.css';

const CityItem = function ({ city }: { city: CityType }) {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
