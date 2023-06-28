import { useRef, useEffect } from 'react';
import { SearchBarProps } from '../types';

const SearchBar = function ({
  query,
  onSetQuery,
}: SearchBarProps): JSX.Element {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = function (e: KeyboardEvent) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === 'Enter' && inputEl.current) {
        inputEl.current.focus();
        onSetQuery('');
      }
    };

    document.addEventListener('keydown', callback);

    if (inputEl.current) {
      inputEl.current.focus();
    }

    return () => document.removeEventListener('keydown', callback);
  }, [onSetQuery]);

  return (
    <input
      className="search"
      type="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default SearchBar;
