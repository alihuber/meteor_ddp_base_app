import React, { useContext } from 'react';
import { ScaleLoader } from 'react-spinners';
import { Row } from 'antd';
import AnimationContext from '../contexts/AnimationContext';

const Loading = () => {
  const animClass = useContext(AnimationContext);
  return (
    <div className={animClass}>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: '35rem' }}
      >
        <ScaleLoader color="#030e21" loading />
      </Row>
    </div>
  );
};
export default Loading;
