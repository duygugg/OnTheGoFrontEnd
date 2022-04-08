import React from 'react';

const Store = React.createContext();
Store.displayName = 'Store';

export const useStore = () => React.useContext(Store);

export const StoreProvider = ({ children }) =>{
    const [state, dispatch] = React.useReducer()
    return(
        <Store.Provider>
            {children}
        </Store.Provider>
    )
}