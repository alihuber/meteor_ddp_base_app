import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Menu } from 'antd';
import { toast } from 'react-toastify';
import CurrentUserContext from '../contexts/CurrentUserContext';

const handleLogin = (history) => {
  history.push('/login');
};

const handleUsers = (history) => {
  history.push('/users');
};

const handleHome = (history) => {
  history.push('/');
};

const handleLogout = (history) => {
  Meteor.logout(() => {
    toast.success('Logout successful!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    history.push('/');
  });
};

const Navbar = () => {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '47px', height: '47px' }}
    >
      <Menu.Item key="1" onClick={() => handleHome(history)}>
        Home
      </Menu.Item>
      {!currentUser || !currentUser._id ? (
        <Menu.Item
          key="2"
          style={{ float: 'right' }}
          onClick={() => handleLogin(history)}
        >
          Login
        </Menu.Item>
      ) : null}
      {currentUser ? (
        <Menu.Item
          key="4"
          style={{ float: 'right' }}
          onClick={() => handleLogout(history)}
        >
          Logout
        </Menu.Item>
      ) : null}
      {currentUser && currentUser.admin ? (
        <Menu.Item
          key="3"
          style={{ float: 'right' }}
          onClick={() => handleUsers(history)}
        >
          Users
        </Menu.Item>
      ) : null}
    </Menu>
  );
};
export default Navbar;
