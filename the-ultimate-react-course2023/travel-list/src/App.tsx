type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const initialItems: ItemType[] = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Notebook', quantity: 1, packed: true },
];

const App = function (): JSX.Element {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
};

const Logo = function (): JSX.Element {
  return <h1>🌴 Far Away 🧳</h1>;
};

const Form = function (): JSX.Element {
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
};

const PackingList = function (): JSX.Element {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

type itemProps = {
  item: ItemType;
};

const Item = function ({ item }: itemProps): JSX.Element {
  const { quantity, description, packed } = item;
  return (
    <li>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = function (): JSX.Element {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
};

export default App;

