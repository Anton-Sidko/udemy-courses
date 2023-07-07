import { CityType, CountryType } from '../../types';
import Message from '../Message/Message';

import Spinner from '../Spinner/Spinner';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

type CountryListProps = {
  cities: CityType[];
  isLoading: boolean;
};

const CountryList = function ({ cities, isLoading }: CountryListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr: CountryType[], city) => {
    const countryInArr = arr.map((el) => el.countryName).includes(city.country);
    if (!countryInArr) {
      return [...arr, { countryName: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={country.countryName}
        />
      ))}
    </ul>
  );
};

export default CountryList;
