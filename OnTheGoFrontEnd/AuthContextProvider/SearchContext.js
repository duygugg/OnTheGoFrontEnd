import React from 'react';

export const SearchContext = React.createContext();

const SearchContextProvider = props => {
  const [text, onChangeText] = React.useState('');
  return (
    <SearchContext.Provider value={[text, onChangeText]}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
