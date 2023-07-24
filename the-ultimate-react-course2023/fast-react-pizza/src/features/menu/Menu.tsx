import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

const Menu = function (): React.JSX.Element {
  const menu = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem
          pizza={pizza}
          key={pizza.id}
        />
      ))}
    </ul>
  );
};

const loader = async function () {
  const menu = await getMenu();
  return menu;
};

// eslint-disable-next-line react-refresh/only-export-components
export { loader };

export default Menu;

