import React, { useContext } from 'react';
import { Typography } from 'antd';
import AnimationContext from '../contexts/AnimationContext';

const { Title } = Typography;

const NotFoundPage = () => {
  const animClass = useContext(AnimationContext);
  return (
    <div className={animClass}>
      <Title level={2}>Not found</Title>
    </div>
  );
};

export default NotFoundPage;
