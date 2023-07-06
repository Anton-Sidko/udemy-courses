import styles from './CountryItem.module.css';

const CountryItem = function ({ country }): React.JSX.Element {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;

