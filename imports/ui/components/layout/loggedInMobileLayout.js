import React from 'react';
import Layout from 'antd/es/layout/layout';
import Navbar from '../Navbar';
import Loading from '../Loading';

const { Header, Content } = Layout;

const loggedInMobileLayout = (children, paddingStr, width, collapsed, setCollapsed, mobile, connectionStatus) => {
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
            <Content className="site-layout-background" style={{ padding: '0 24px', minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        ) : <Loading />}
      </Content>
    </Layout>
  );
};
export default loggedInMobileLayout;
