import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';

import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/City/CityList';
import PageNotFount from './pages/PageNotFount';
import CountryList from './components/Country/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';

const App = function (): React.JSX.Element {
  return (
    <CitiesProvider>
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
                <Navigate
                  replace
                  to="cities"
                />
              }
            />
            <Route
              path="cities"
              element={<CityList />}
            />
            <Route
              path="cities/:id"
              element={<City />}
            />
            <Route
              path="countries"
              element={<CountryList />}
            />
            <Route
              path="form"
              element={<Form />}
            />
          </Route>

          <Route
            path="*"
            element={<PageNotFount />}
          />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
};

export default App;

