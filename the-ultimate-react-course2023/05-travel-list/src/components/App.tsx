import { useState } from 'react';
import { ItemType } from '../types';

import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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

  const handleClearItems = function () {
    const confirmed = window.confirm(
      'Are you really want to delete all items from list'
    );

    if (confirmed) {
      setItems([]);
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;

