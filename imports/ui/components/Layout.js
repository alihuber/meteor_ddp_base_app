import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import Navbar from './Navbar.js';

const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  return (
    <Layout>
      <Header className="header" style={{ height: '47px', lineHeight: '47px' }}>
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
