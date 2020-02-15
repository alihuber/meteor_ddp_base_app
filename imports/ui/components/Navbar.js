import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Menu } from 'antd';
import { toast } from 'react-toastify';

const handleLogin = (history) => {
  history.push('/login');
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
  const currentUser = useTracker(() => Meteor.user());
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
          key="3"
          style={{ float: 'right' }}
          onClick={() => handleLogout(history)}
        >
          Logout
        </Menu.Item>
      ) : null}
    </Menu>
  );
};
export default Navbar;
