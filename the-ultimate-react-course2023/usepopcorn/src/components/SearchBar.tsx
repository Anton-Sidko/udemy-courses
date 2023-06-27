import { SearchBarProps } from '../types';

const SearchBar = function ({
  query,
  onSetQuery,
}: SearchBarProps): JSX.Element {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
};

export default SearchBar;
