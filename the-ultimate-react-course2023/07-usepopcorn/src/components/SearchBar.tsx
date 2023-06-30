import { useRef, useEffect } from 'react';
import { SearchBarProps } from '../types';
import { useKey } from '../hooks/useKey';

const SearchBar = function ({
  query,
  onSetQuery,
}: SearchBarProps): JSX.Element {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    if (inputEl.current) inputEl.current.focus();
    onSetQuery('');
  });

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

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
