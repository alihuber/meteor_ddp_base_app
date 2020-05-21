import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Layout from 'antd/es/layout/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Navbar from './Navbar.js';
import Loading from './Loading';
import ServerConnectionContext from '../contexts/ServerConnectionContext';

const { Header, Content, Footer } = Layout;

const LayoutComponent = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const paddingStr = isTabletOrMobile ? '0' : '0 50px';
  const connectionStatus = useContext(ServerConnectionContext);
  const width = window.innerWidth;
  return (
    <Layout>
      <Header
        className="header"
        style={{ position: 'fixed', zIndex: 1, lineHeight: '47px', height: '47px', padding: paddingStr, width: width }}
      >
        <Navbar />
      </Header>
      <Content style={{ marginTop: 48 }}>
        {connectionStatus === 'connected' ? (
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 900,
            }}
          >
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                {children}
              </Col>
            </Row>
          </Content>
        ) : <Loading />}
      </Content>
      <Footer style={{ textAlign: 'center' }}>ACME Corp.</Footer>
    </Layout>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.object,
};

export default LayoutComponent;
