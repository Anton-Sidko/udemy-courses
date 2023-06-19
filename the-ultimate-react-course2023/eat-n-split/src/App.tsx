import { useState } from 'react';

type FriendType = {
  id: number | string;
  name: string;
  image: string;
  balance: number;
};

const initialFriends: FriendType[] = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const App = function (): JSX.Element {
  const [friends, setFriends] = useState<FriendType[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleShowAddFriend = function () {
    setShowAddFriend((show) => !show);
  };

  const handleSetFriends = function (newFriend: FriendType) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />

        {showAddFriend && <FormAddFriend onAddFriend={handleSetFriends} />}
        <Button handleClick={handleShowAddFriend}>
          {!showAddFriend ? 'Add friend' : 'Close'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
};

export default App;

type FriendListProps = {
  friends: FriendType[];
};

const FriendsList = function ({ friends }: FriendListProps): JSX.Element {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
};

type FriendProps = {
  friend: FriendType;
};

const Friend = function ({ friend }: FriendProps): JSX.Element {
  const { name, image, balance } = friend;

  return (
    <li>
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

      <Button>Select</Button>
    </li>
  );
};

type ButtonProps = {
  handleClick?: () => void;
  children?: React.ReactNode;
};

const Button = function ({ handleClick, children }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={handleClick}
      className="button"
    >
      {children}
    </button>
  );
};

type FormAddFriendProps = {
  onAddFriend: (newFriend: FriendType) => void;
};

const FormAddFriend = function ({
  onAddFriend,
}: FormAddFriendProps): JSX.Element {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend: FriendType = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}
    >
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = function (): JSX.Element {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧑 Your expense</label>
      <input type="text" />

      <label>👫 X's expense</label>
      <input
        type="text"
        disabled
      />

      <label>🤑 Who is paying bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

