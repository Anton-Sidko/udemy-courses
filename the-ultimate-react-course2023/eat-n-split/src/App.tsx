type FriendType = {
  id: number;
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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
};

export default App;

const FriendsList = function (): JSX.Element {
  const friends = initialFriends;

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

