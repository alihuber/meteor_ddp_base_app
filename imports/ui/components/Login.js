import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import AnimationContext from '../contexts/AnimationContext';

const { Title } = Typography;

const LoginPage = () => {
  const animClass = useContext(AnimationContext);
  return (
    <div className={animClass}>
      <Title level={2}>Login</Title>
    </div>
  );
};

export default LoginPage;
