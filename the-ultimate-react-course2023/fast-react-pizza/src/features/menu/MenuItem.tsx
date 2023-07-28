import { useDispatch, useSelector } from 'react-redux';

import { cartItemType, pizzaType } from '../../types';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';

import { formatCurrency } from '../../utils/helpers';

import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

const MenuItem = function ({ pizza }: { pizza: pizzaType }): React.JSX.Element {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // const isPizzaInCart = useSelector((state: RootState) =>
  //   state.cart.cart.map((item) => item.pizzaId).includes(id),
  // );
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = function () {
    const newItem: cartItemType = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />

      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="mb-2 text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          {!soldOut ? (
            <p className="mr-3 text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="mr-3 text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-7">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
