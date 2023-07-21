import { useState } from 'react';

const CreateUser = function (): React.JSX.Element {
  const [username, setUsername] = useState('');

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <button>Start ordering</button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;

