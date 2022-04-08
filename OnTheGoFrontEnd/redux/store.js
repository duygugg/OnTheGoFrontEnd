import { applyMiddleware, createStore } from "redux";
import RootReducer from './Reducers/RootReducer';
import {persistStore,persistReducer } from "redux-persist";
 import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig={
    key:'root',
    storage:AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig,RootReducer)


export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }