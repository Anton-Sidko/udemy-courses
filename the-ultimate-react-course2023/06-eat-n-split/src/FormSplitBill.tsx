import { useState } from 'react';
import { FormSplitBillProps } from './types';
import { Button } from './Button';

export const FormSplitBill = function ({
  friend,
  onSplitBill,
}: FormSplitBillProps): JSX.Element {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const paidByFriend = bill ? bill - paidByUser : '';

  const { name } = friend;

  const handleBillChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const value = +e.target.value;

    if (isNaN(value)) return;
    setBill(value);
  };

  const handleUserPaidChange = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    let value = +e.target.value;

    if (isNaN(value)) return;
    if (bill && value > bill) {
      value = paidByUser;
    }

    setPaidByUser(value);
  };

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    if (paidByFriend !== '') {
      onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
    }
  };

  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}
    >
      <h2>Split a bill with {name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={handleBillChange}
      />

      <label>🧑 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={handleUserPaidChange}
        disabled={!bill}
      />

      <label>👫 {name}'s expense</label>
      <input
        type="text"
        value={paidByFriend}
        disabled
      />

      <label>🤑 Who is paying bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};
