export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: { lat: number; lng: number };
  id: number;
};

export type CountryType = {
  countryName: string;
  emoji: string;
};
