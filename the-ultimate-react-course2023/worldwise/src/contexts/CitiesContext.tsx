import { createContext, useContext, useEffect, useState } from 'react';
import { CityType } from '../types';

const BASE_URL = 'http://localhost:8000';

type CitiesContextType = {
  cities: CityType[];
  currentCity: CityType | null;
  isLoading: boolean;
  getCity: (id: string | number) => void;
};

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);

const CitiesProvider = function ({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async function () {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.error(
          `There was error loading data: ${(error as Error).message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async function (id: string | number) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      console.error(
        `There was error loading data: ${(error as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        getCity,
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
