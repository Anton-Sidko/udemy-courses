import { ChangeEventHandler } from 'react';

import './search-box.styles.css';

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  search: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const SearchBox = ({
  className,
  placeholder,
  search,
  onChangeHandler,
}: SearchBoxProps) => (
  <input
    type="search"
    className={`search-box ${className}`}
    placeholder={placeholder}
    value={search}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
