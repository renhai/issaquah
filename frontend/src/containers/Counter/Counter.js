import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { increment } from '../../actions/counters';

const cx = className.bind(require('./Counter.css'));

const stateToProps = state => ({
  count: state.counter.count,
});

const actionToProps = {
  onClick: increment,
};

@injectIntl
@connect(stateToProps, actionToProps)
export default class Counter extends React.Component {
  props: {
    count: number,
    onClick: () => void
  };

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { count } = this.props;
    const message = { count };

    return (
      <div className="columns is-mobile">
        <section className="column">
          <p>
            <button className={cx('button', 'is-info', 'button-align')} onClick={this.handleClick}>
              <FormattedMessage id="COUNT" values={message} />
            </button>
          </p>
        </section>
      </div>
    );
  }
}
