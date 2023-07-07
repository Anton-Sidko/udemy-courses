export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: { lat: string; lng: string };
  id: number;
};

export type CountryType = {
  countryName: string;
  emoji: string;
};
