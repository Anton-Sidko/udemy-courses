import { CountryType } from '../../types';
import { flagEmojiToPNG } from '../../utils';
import styles from './CountryItem.module.css';

const CountryItem = function ({
  country,
}: {
  country: CountryType;
}): React.JSX.Element {
  const { countryName, emoji } = country;

  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(emoji)}</span>
      <span>{countryName}</span>
    </li>
  );
};

export default CountryItem;

