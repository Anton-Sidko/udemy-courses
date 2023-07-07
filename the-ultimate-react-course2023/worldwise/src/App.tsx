import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CityType } from './types';

import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/City/CityList';
import PageNotFount from './pages/PageNotFount';
import CountryList from './components/Country/CountryList';

const BASE_URL = 'http://localhost:8000';

const App = function (): React.JSX.Element {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async function () {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          `There was error loading data: ${(error as Error).message}`;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Homepage />}
        />
        <Route
          path="product"
          element={<Product />}
        />
        <Route
          path="pricing"
          element={<Pricing />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="app"
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="cities"
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="countries"
            element={
              <CountryList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="form"
            element={<p>Form</p>}
          />
        </Route>
        <Route
          path="*"
          element={<PageNotFount />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

