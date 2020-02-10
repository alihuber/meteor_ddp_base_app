import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title } = Typography;
// import AnimContext from '../contexts/AnimContext';

const NotFoundPage = () => {
  // const animClass = useContext(AnimContext);
  return <Title level={2}>404 - Not found</Title>;
  // return (
  //   <div className={animClass}>
  //   </div>
  // );
};

export default NotFoundPage;
