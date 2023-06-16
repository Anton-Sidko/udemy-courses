import { itemProps } from '../types';

const Item = function ({
  item,
  onDeleteItem,
  onToggleItem,
}: itemProps): JSX.Element {
  const { id, quantity, description, packed } = item;
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
};

export default Item;
