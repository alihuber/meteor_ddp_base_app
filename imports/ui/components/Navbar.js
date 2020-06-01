import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Menu from 'antd/es/menu';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import RedoOutlined from '@ant-design/icons/RedoOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import { toast } from 'react-toastify';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ServerConnectionContext from '../contexts/ServerConnectionContext';

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

const handleAccount = (history) => {
  history.push('/account');
};

const handleLogout = (history) => {
  Meteor.logout(() => {
    toast.success('Logout successful!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    history.push('/');
  });
};

const buttonMenu = (currentUser, history) => {
  if (!currentUser) {
    return (
      <Menu.Item
        key="22"
        style={{ float: 'right' }}
        onClick={() => handleLogin(history)}
      >
        Login
      </Menu.Item>
    );
  }
  if (currentUser) {
    return (
      <Menu.Item
        key="55"
        style={{ float: 'right' }}
        onClick={() => handleLogout(history)}
      >
        <span>
          <LogoutOutlined />
          {' '}
          <span>Logout</span>
        </span>
      </Menu.Item>
    );
  }
};

const mobileMenu = (currentUser, history) => {
  if (!currentUser || !currentUser._id) {
    return (
      <Menu.Item
        key="2"
        style={{ float: 'right' }}
        onClick={() => handleLogin(history)}
      >
        Login
      </Menu.Item>
    );
  }
  if (currentUser) {
    return (
      <SubMenu
        style={{ float: 'right' }}
        key="sub1"
        title={(
          <span>
            <MenuOutlined />
            {' '}
            <span>Menu</span>
          </span>
        )}
      >
        <Menu.Item key="4" onClick={() => handleAccount(history)}>
          <span>
            <UserOutlined />
            {' '}
            <span>Account</span>
          </span>
        </Menu.Item>
        {currentUser?.admin ? (
          <Menu.Item
            key="3"
            onClick={() => handleUsers(history)}
          >
            <span>
              <UsergroupAddOutlined />
              {' '}
              <span>Users</span>
            </span>
          </Menu.Item>
        ) : null}
        <Menu.Item key="44" onClick={() => handleSettings(history)}>
          <span>
            <SettingOutlined />
            {' '}
            <span>Settings</span>
          </span>
        </Menu.Item>
        <Menu.Item key="5" onClick={() => handleLogout(history)}>
          <span>
            <LogoutOutlined />
            {' '}
            <span>Logout</span>
          </span>
        </Menu.Item>
      </SubMenu>
    );
  }
};

const Navbar = ({ mobile, collapsed, setCollapsed }) => {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const connectionStatus = useContext(ServerConnectionContext);
  return (
    <Menu theme="dark" mode="horizontal">
      {!mobile && currentUser && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        style: { marginLeft: '0px' },
        onClick: () => setCollapsed && setCollapsed(!collapsed),
      })}
      <Menu.Item key="1" onClick={() => handleHome(history)}>
        Home
      </Menu.Item>
      {connectionStatus === 'connected' && !mobile ? buttonMenu(currentUser, history) : null}
      {connectionStatus === 'connected' && mobile ? mobileMenu(currentUser, history) : null}
      {connectionStatus !== 'connected' ? (<Menu.Item key="7" style={{ float: 'right' }} onClick={() => Meteor.reconnect()}><RedoOutlined /></Menu.Item>) : null}
    </Menu>

  );
};

Navbar.propTypes = {
  mobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

export default Navbar;
