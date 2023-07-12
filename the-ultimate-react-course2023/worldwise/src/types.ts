export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: { lat: number | null; lng: number | null };
  id?: number;
};

export type CountryType = {
  countryName: string;
  emoji: string;
};
