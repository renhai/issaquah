import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import browserHistory from 'react-router/lib/browserHistory';
import { routerMiddleware } from 'react-router-redux';
import helpers from '../helpers/index';

export default [
  routerMiddleware(browserHistory),
  thunk.withExtraArgument(helpers),
  promiseMiddleware(),
];
