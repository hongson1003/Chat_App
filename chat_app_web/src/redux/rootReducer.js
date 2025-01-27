import { combineReducers } from 'redux';
import { appReducer, userReducer } from './reducers';

export default combineReducers({
  app: appReducer,
  user: userReducer,
});
