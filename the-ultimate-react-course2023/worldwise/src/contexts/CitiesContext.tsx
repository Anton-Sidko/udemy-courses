import { createContext, useContext, useEffect, useState } from 'react';
import { CityType } from '../types';

const BASE_URL = 'http://localhost:8000';

type CitiesContextType = {
  cities: CityType[];
  currentCity: CityType | null;
  isLoading: boolean;
  getCity: (id: string | number) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (id: string | number) => void;
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

  const createCity = async function (newCity: CityType) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(
        `There was error creating city: ${(error as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async function (id: string | number) {
    try {
      setIsLoading(true);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error(
        `There was error deleting city: ${(error as Error).message}`
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
