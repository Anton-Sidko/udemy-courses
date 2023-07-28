import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

const UpdateItemQuantity = function ({
  id,
  currentQuantity,
}: {
  id: number | string;
  currentQuantity: number;
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
