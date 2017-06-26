import React from 'react';
// import { IndexLink, Link } from 'react-router';
// import className from 'classnames/bind';
// import ChangeLocale from './ChangeLocale';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

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
              <NavItem eventKey={2} href="/counter">第二个页面</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
