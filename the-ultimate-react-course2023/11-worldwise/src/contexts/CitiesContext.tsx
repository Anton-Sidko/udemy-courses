import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { CityState, CityType } from '../types';
import { cityReducer } from './reducer';

const BASE_URL = 'http://localhost:8000';

const initialCityState: CityState = {
  cities: [],
  currentCity: null,
  isLoading: false,
  error: '',
};

type CitiesContextType = {
  cities: CityType[];
  currentCity: CityType | null;
  isLoading: boolean;
  error: string;
  getCity: (id: string | number) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (id: string | number) => void;
};

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);

const CitiesProvider = function ({ children }: { children: React.ReactNode }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    cityReducer,
    initialCityState
  );

  useEffect(() => {
    const fetchCities = async function () {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: (error as Error).message });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function (id: string | number) {
      if (+id === currentCity?.id) return;

      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: (error as Error).message });
      }
    },
    [currentCity?.id]
  );

  const createCity = async function (newCity: CityType) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: (error as Error).message });
    }
  };

  const deleteCity = async function (id: string | number) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: (error as Error).message });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = function () {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error('CitiesContext was used outside the CitiesProvider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
