import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Menu, Icon } from 'antd';
import { toast } from 'react-toastify';
import CurrentUserContext from '../contexts/CurrentUserContext';

const { SubMenu } = Menu;

const handleSettings = (history) => {
  history.push('/settings');
};

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
    <Menu theme="dark" mode="horizontal">
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
        <SubMenu
          style={{ float: 'right' }}
          key="sub1"
          title={
            <span>
              <Icon type="menu" /> <span>Menu</span>
            </span>
          }
        >
          <Menu.Item key="4" onClick={() => handleSettings(history)}>
            <span>
              <Icon type="setting" /> <span>Settings</span>
            </span>
          </Menu.Item>
          <Menu.Item key="5" onClick={() => handleLogout(history)}>
            <span>
              <Icon type="logout" /> <span>Logout</span>
            </span>
          </Menu.Item>
        </SubMenu>
      ) : null}
      {currentUser?.admin ? (
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
