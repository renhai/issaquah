import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import './messages/intlPolyfill';
import store from './store';

const CONTAINER = document.getElementById('app');

function render() {
  const Root = require('./containers/Root');
  ReactDOM.render(<Root store={store} />, CONTAINER);
}

render();

/**
 * React-Hot-Loader v3
 * @see https://github.com/gaearon/react-hot-loader/issues/243
 * @caution Hot Load Only Available for React Component
 */
if (module.hot) {
  module.hot.accept('./containers/Root', render);
}
