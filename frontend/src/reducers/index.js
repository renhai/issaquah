import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import locale from './locale';
import counter from './counter';
import todo from './todo';

export default combineReducers({
  routing,
  locale,
  counter,
  todo,
});
