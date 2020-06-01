import React from 'react';
import Layout from 'antd/es/layout/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Navbar from '../Navbar';
import Loading from '../Loading';

const { Header, Content, Footer } = Layout;

const publicLayout = (children, paddingStr, width, mobile, connectionStatus) => {
  return (
    <Layout>
      <Header
        className="header"
        style={{
          position: 'fixed',
          zIndex: 1,
          lineHeight: '47px',
          height: '47px',
          padding: paddingStr,
          width: width,
        }}
      >
        <Navbar mobile={mobile} />
      </Header>
      <Content style={{ marginTop: 48 }}>
        {connectionStatus === 'connected' ? (
          <div
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 'calc(100vh - 55px)',
            }}
          >
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                {children}
              </Col>
            </Row>
          </div>
        ) : <Loading />}
      </Content>
      <Footer style={{ position: 'sticky', textAlign: 'center', bottom: '0px' }}>ACME Corp.</Footer>
    </Layout>
  );
};

export default publicLayout;
