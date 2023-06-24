import { useState } from 'react';
import { FriendType, initialFriends } from './types';
import { Button } from './Button';
import { FormAddFriend } from './FormAddFriend';
import { FriendsList } from './FriendsList';
import { FormSplitBill } from './FormSplitBill';

const App = function (): JSX.Element {
  const [friends, setFriends] = useState<FriendType[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);

  const handleShowAddFriend = function () {
    setShowAddFriend((show) => !show);
    setSelectedFriend(null);
  };

  const handleSetFriends = function (newFriend: FriendType) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelection = function (friend: FriendType) {
    setSelectedFriend((curSelected) =>
      curSelected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  };

  const handleUpdateBalance = function (value: number) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleSetFriends} />}

        <Button handleClick={handleShowAddFriend}>
          {!showAddFriend ? 'Add friend' : 'Close'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          onSplitBill={handleUpdateBalance}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
};

export default App;

