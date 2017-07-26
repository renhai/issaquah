import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import locale from './locale';
import counter from './counter';
import todo from './todo';
import home from './home';

export default combineReducers({
  loadingBar: loadingBarReducer,
  routing,
  locale,
  counter,
  todo,
  home,
});
