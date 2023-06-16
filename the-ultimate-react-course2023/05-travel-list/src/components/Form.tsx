import { useState } from 'react';
import { ItemType, formProps } from '../types';

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

export default Form;
