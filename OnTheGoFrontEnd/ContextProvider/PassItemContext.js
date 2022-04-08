import React, {useState} from 'react';

export const PassItemContext = React.createContext();

const PassItemProvider = props => {
  const [length, setLength] = useState(null);
  const [isSelected, setSelected] = useState(null);
  const [isAllSelected, setAllSelected] = useState(false);
  const [total, setTotal] = useState(0);

  const change = () => {
    setSelected(new Array(length).fill(false));

    // console.log('length changed:', length);
  };

  React.useEffect(() => {
    change();
  }, [length]);

  return (
    <PassItemContext.Provider
      value={{
        lengthData: [length, setLength],
        selectedData: [isSelected, setSelected],
        allSelectedData: [isAllSelected, setAllSelected],
        totalData: [total, setTotal],
      }}>
      {props.children}
    </PassItemContext.Provider>
  );
};

export default PassItemProvider;