import React from 'react';
import Layout from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import Sider from 'antd/es/layout/Sider';
import UserOutlined from '@ant-design/icons/UserOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import Navbar from '../Navbar';
import Loading from '../Loading';

const { Header, Content } = Layout;

const handleSettings = (history) => {
  history.push('/settings');
};

const handleUsers = (history) => {
  history.push('/users');
};

const handleAccount = (history) => {
  history.push('/account');
};

const loggedInLayout = (currentUser, children, paddingStr, width, collapsed, setCollapsed, mobile, connectionStatus, history) => {
  return (
    <Layout>
      <Header
        className="header"
        style={{ position: 'fixed', zIndex: 1, lineHeight: '47px', height: '47px', padding: paddingStr, width: width }}
      >
        <Navbar mobile={mobile} collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Content style={{ marginTop: 48 }}>
        {connectionStatus === 'connected' ? (
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider
              trigger={null}
              className="site-layout-background"
              width={150}
              collapsible
              collapsed={collapsed}
            >
              <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
              >
                <Menu.Item key="4" onClick={() => handleAccount(history)}>
                  <span>
                    <UserOutlined />
                    {' '}
                    <span>Account</span>
                  </span>
                </Menu.Item>
                {currentUser && currentUser.admin ? (
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
                <Menu.Item key="14" icon={<SettingOutlined />} onClick={() => handleSettings(history)}>Settings</Menu.Item>
              </Menu>
            </Sider>
            <Content className="site-layout-background" style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
          </Layout>
        ) : <Loading />}
      </Content>
    </Layout>
  );
};

export default loggedInLayout;
