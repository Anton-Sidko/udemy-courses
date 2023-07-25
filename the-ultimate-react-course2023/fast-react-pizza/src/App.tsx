import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import RouterError from './ui/RouterError';

import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouterError />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <RouterError />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <RouterError />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <RouterError />,
      },
    ],
  },
]);

const App = function (): React.JSX.Element {
  return <RouterProvider router={router} />;
};

export default App;

