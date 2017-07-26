import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import browserHistory from 'react-router/lib/browserHistory';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import helpers from '../helpers/index';

const promiseTypeSuffixes = ['LOADING', 'SUCCESS', 'ERROR'];

export default [
  routerMiddleware(browserHistory),
  thunk.withExtraArgument(helpers),
  promiseMiddleware({ promiseTypeSuffixes }),
  loadingBarMiddleware({ promiseTypeSuffixes })
];
