import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Layout, Row, Col } from 'antd';
import Navbar from './Navbar.js';

const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const paddingStr = isTabletOrMobile ? '0' : '0 50px';
  return (
    <Layout>
      <Header
        className="header"
        style={{ lineHeight: '47px', height: '47px', padding: paddingStr }}
      >
        <Navbar />
      </Header>
      <Layout>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
              {children}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.object,
};

export default LayoutComponent;
