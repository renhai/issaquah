/**
 * @see https://github.com/reactjs/react-router
 * @see https://github.com/reactjs/react-router-redux
 */
import React from 'react';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import Provider from 'react-redux/lib/components/Provider';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import RedBox from 'redbox-react';
import routes from './routes';

export default class Root extends React.Component {
  props: {
    store: any
  };

  state: {
    store?: any,
    history?: any
  };

  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
      history: syncHistoryWithStore(browserHistory, this.props.store),
    };
  }

  render() {
    const { store, history } = this.state;
    return (
      <AppContainer errorReporter={RedBox}>
        <Provider store={store} key="provider">
          <Router routes={routes} history={history} />
        </Provider>
      </AppContainer>
    );
  }
}
