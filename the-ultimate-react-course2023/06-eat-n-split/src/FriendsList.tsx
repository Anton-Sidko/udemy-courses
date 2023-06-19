import { FriendListProps } from './types';
import { Friend } from './Friend';

export const FriendsList = function ({
  friends,
  selectedFriend,
  onSelection,
}: FriendListProps): JSX.Element {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};
