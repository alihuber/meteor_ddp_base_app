import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
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
              <MenuOutlined /> <span>Menu</span>
            </span>
          }
        >
          {currentUser?.admin ? (
            <Menu.Item
              key="3"
              onClick={() => handleUsers(history)}
            >
              <span>
                <UserOutlined /><span>Users</span>
              </span>
            </Menu.Item>
          ) : null}
          <Menu.Item key="4" onClick={() => handleSettings(history)}>
            <span>
              <SettingOutlined /> <span>Settings</span>
            </span>
          </Menu.Item>
          <Menu.Item key="5" onClick={() => handleLogout(history)}>
            <span>
              <LogoutOutlined /> <span>Logout</span>
            </span>
          </Menu.Item>
        </SubMenu>
      ) : null}
    </Menu>
  );
};
export default Navbar;
