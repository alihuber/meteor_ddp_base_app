import React, { useContext } from 'react';
import { Typography } from 'antd';
import AnimationContext from '../contexts/AnimationContext';

const { Title } = Typography;

const HomePage = () => {
  const animClass = useContext(AnimationContext);
  return (
    <div className={animClass}>
      <Title level={2}>Home</Title>
    </div>
  );
};

export default HomePage;
