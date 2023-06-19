export const initialFriends: FriendType[] = [
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

export type FriendType = {
  id: number | string;
  name: string;
  image: string;
  balance: number;
};

export type FriendProps = {
  friend: FriendType;
  selectedFriend: FriendType | null;
  onSelection: (friend: FriendType) => void;
};

export type ButtonProps = {
  handleClick?: () => void;
  children?: React.ReactNode;
};

export type FormAddFriendProps = {
  onAddFriend: (newFriend: FriendType) => void;
};

export type FriendListProps = {
  friends: FriendType[];
  selectedFriend: FriendType | null;
  onSelection: (friend: FriendType) => void;
};

export type FormSplitBillProps = {
  friend: FriendType;
  onSplitBill: (value: number) => void;
};
