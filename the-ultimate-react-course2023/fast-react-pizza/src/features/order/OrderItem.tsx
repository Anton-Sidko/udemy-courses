import { cartItemType } from '../../types';
import { formatCurrency } from '../../utils/helpers';

type OrderItemProps = {
  item: cartItemType;
  isLoadingIngredients: boolean;
  ingredients: string[];
};

const OrderItem = function ({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps): React.JSX.Element {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
};

export default OrderItem;

