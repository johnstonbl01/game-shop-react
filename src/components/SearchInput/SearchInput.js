import React, { useState } from 'react';

import searchIcon from './search.svg';
import './SearchInput.css';

const SearchInput = (props) => {
  const [inputIsFocused, setInputFocus] = useState(false);

  const onInputSubmit = (evt) => evt.key === 'Enter' && evt.target.blur();
  const onInputFocus = () => setInputFocus((prevValue) => !prevValue);

  const inputFocusStyle = inputIsFocused ? { border: `1px solid #17b978` } : null;

  return (
    <div className="input-layout" style={inputFocusStyle}>
      <img src={searchIcon} alt="search icon" className="search-icon" />
      <input
        type="text"
        onFocus={onInputFocus}
        onBlur={onInputFocus}
        onKeyPress={onInputSubmit}
        placeholder="Find your game..."
        {...props}
      />
    </div>
  );
};

export default SearchInput;
