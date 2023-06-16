export type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

export type formProps = {
  onAddItem: (item: ItemType) => void;
};

export type packingListProps = {
  items: ItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearItems: () => void;
};

export type itemProps = {
  item: ItemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
};

export type statsProps = {
  items: ItemType[];
};
