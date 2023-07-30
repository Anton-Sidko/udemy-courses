import { useDispatch } from 'react-redux';

import { deleteItem } from './cartSlice';

import Button from '../../ui/Button';

const DeleteItem = function ({ id }: { id: string | number }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
