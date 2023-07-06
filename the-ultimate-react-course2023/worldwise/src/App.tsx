import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFount from './pages/PageNotFount';

const App = function (): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
        />
        <Route
          path="*"
          element={<PageNotFount />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

