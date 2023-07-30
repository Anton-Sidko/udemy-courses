import { cartItemType } from '../../types';
import { formatCurrency } from '../../utils/helpers';

type OrderItemProps = {
  item: cartItemType;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

const OrderItem = function ({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps): React.JSX.Element {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? 'Loading ingredients...'
          : ingredients?.join(', ')}
      </p>
    </li>
  );
};

export default OrderItem;
