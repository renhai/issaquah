import React from 'react';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { Header, Footer } from '../components/index';
import messages from '../messages/index';

const stateToProps = state => ({
  locale: state.locale.locale,
});

@connect(stateToProps)
export default class App extends React.Component {
  props: {
    children: any,
    locale: string
  };

  head = {
    title: 'Hai Ren',
  };

  render() {
    const { children, locale } = this.props;
    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
          <Helmet {...this.head} />
          <div>
            <Header />
            <div className="section">
              <div className="container">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </IntlProvider>
    );
  }
}
