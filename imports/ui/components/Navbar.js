import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

const handleLogin = (history) => {
  history.push('/login');
};

const handleHome = (history) => {
  history.push('/');
};

const Navbar = () => {
  const history = useHistory();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '47px', height: '47px' }}
    >
      <Menu.Item key="1" onClick={() => handleHome(history)}>
        Home
      </Menu.Item>
      <Menu.Item key="3" style={{ float: 'right' }}>
        nav 3
      </Menu.Item>
      <Menu.Item
        key="2"
        style={{ float: 'right' }}
        onClick={() => handleLogin(history)}
      >
        Login
      </Menu.Item>
    </Menu>
  );
};
export default Navbar;
