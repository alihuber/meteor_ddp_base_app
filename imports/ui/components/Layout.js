import React, { useContext, useState, useEffect } from 'react';
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
  const [width, setWidth] = useState(window.innerWidth);
  const connectionStatus = useContext(ServerConnectionContext);
  const handleMediaQueryChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleMediaQueryChange);
    window.addEventListener('orientationchange', handleMediaQueryChange);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }, undefined, handleMediaQueryChange);
  const paddingStr = isTabletOrMobile ? '0' : '0 50px';
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

LayoutComponent.propTypes = {
  children: PropTypes.object,
};

export default LayoutComponent;
