import './search-box.styles.css';

const SearchBox = ({ search, onChangeHandler, placeholder, className }) => (
  <input
    type="search"
    className={`search-box ${className}`}
    placeholder={placeholder}
    value={search}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
