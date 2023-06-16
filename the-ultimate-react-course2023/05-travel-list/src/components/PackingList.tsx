import { useState } from 'react';
import { ItemType, packingListProps } from '../types';

import Item from './Item';

const PackingList = function ({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}: packingListProps): JSX.Element {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems: ItemType[] = [];

  if (sortBy === 'input') {
    sortedItems = items;
  }

  if (sortBy === 'description') {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === 'packed') {
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
};

export default PackingList;
