import { useState } from 'react';

type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const App = function (): JSX.Element {
  const [items, setItems] = useState<ItemType[]>([]);

  const handleAddItem = function (item: ItemType) {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = function (id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = function (id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = function (): JSX.Element {
  return <h1>🌴 Far Away 🧳</h1>;
};

type formProps = {
  onAddItem: (item: ItemType) => void;
};

const Form = function ({ onAddItem }: formProps): JSX.Element {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem: ItemType = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);
    setDescription('');
    setQuantity(1);
  };

  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSelectChange = function (
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}
    >
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={handleSelectChange}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option
            value={num}
            key={num}
          >
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleInputChange}
      />
      <button>Add</button>
    </form>
  );
};

type packingListProps = {
  items: ItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
};

const PackingList = function ({
  items,
  onDeleteItem,
  onToggleItem,
}: packingListProps): JSX.Element {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
};

type itemProps = {
  item: ItemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
};

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

type statsProps = {
  items: ItemType[];
};

const Stats = function ({ items }: statsProps): JSX.Element {
  if (!items.length) {
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );
  }

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentPacked = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? 'You got everything! Ready to go ✈'
          : `💼 You have ${numItems} items on your list, and you already packed ${packedItems} (${
              isNaN(percentPacked) ? 0 : percentPacked
            }%)`}
      </em>
    </footer>
  );
};

export default App;

