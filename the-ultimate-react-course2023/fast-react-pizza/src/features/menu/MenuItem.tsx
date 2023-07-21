import { pizzaType } from '../../types';
import { formatCurrency } from '../../utils/helpers';

const MenuItem = function ({ pizza }: { pizza: pizzaType }): React.JSX.Element {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li>
      <img
        src={imageUrl}
        alt={name}
      />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;

