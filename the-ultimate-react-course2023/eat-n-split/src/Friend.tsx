import { FriendProps } from './types';
import { Button } from './Button';

export const Friend = function ({
  friend,
  selectedFriend,
  onSelection,
}: FriendProps): JSX.Element {
  const { name, image, balance, id } = friend;
  const isSelected = selectedFriend?.id === id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img
        src={image}
        alt={name}
      />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}$
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owe you {Math.abs(balance)}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}

      <Button handleClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
};
