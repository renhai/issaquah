import React from 'react';
// import { IndexLink, Link } from 'react-router';
// import className from 'classnames/bind';
// import ChangeLocale from './ChangeLocale';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';
import './Header.css';

// const cx = className.bind(require('./Header.css'));

export default class Header extends React.Component {
  state = {
    menuOpen: false,
  };

  // handleClickMenu = () => {
  //   this.setState({
  //     menuOpen: !this.state.menuOpen,
  //   });
  // };
  //
  // linkProps = {
  //   className: 'header-tab',
  //   activeClassName: 'is-active',
  // };

  render() {
    // const { menuOpen } = this.state;

    return (
      <header>
        <LoadingBar style={{zIndex: 1, backgroundColor: '#649f2b'}} />
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">测试员管理</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">首页</NavItem>
              <NavItem eventKey={2} href="#">About Me</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Help</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
