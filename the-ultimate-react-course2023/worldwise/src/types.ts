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

export type CityState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
};

export interface Action {
  type: string;
  payload?: any;
}

export type AuthState = {
  user: UserType | null;
  isAuthenticated: boolean;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
