import UserReducer from './UserReducer';
import UserDetailsReducer from './UserDetailsReducer';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  UserDetailsReducer: UserDetailsReducer,
});

export default rootReducer;
