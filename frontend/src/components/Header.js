import React from 'react';
import { IndexLink, Link } from 'react-router';
import className from 'classnames/bind';
import ChangeLocale from './ChangeLocale';

const cx = className.bind(require('./Header.css'));

export default class Header extends React.Component {
  state = {
    menuOpen: false,
  };

  handleClickMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  linkProps = {
    className: 'header-tab',
    activeClassName: 'is-active',
  };

  render() {
    const { menuOpen } = this.state;

    return (
      <header className="header">
        <div className="container">
          <div className="header-left">
            <IndexLink to="/" {...this.linkProps}>Home</IndexLink>
            <Link to="/counter" {...this.linkProps}>Counter</Link>
            <Link to="/todo" {...this.linkProps}>Todo</Link>
          </div>
          <span className="header-toggle" onClick={this.handleClickMenu}>
            <span />
            <span />
            <span />
          </span>
          <div className={cx('header-right', 'header-menu', { menuOpen })}>
            <div className="header-item">
              <ChangeLocale />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
