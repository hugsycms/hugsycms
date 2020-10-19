import { combineReducers } from 'redux';
import user from './user';
import tabs from './tabs';
import system from './system';

export default combineReducers({
  user,
  tabs,
  system,
});
