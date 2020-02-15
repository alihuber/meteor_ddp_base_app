import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Layout from './Layout';
import Routing from './Routing';
import AnimationContext from '../contexts/AnimationContext';

toast.configure();

const Root = () => {
  const layout = Layout;
  const animClass =
    window.innerWidth > 860
      ? 'ract-transition fade-in'
      : 'ract-transition swipe-right';
  return (
    <>
      <AnimationContext.Provider value={animClass}>
        <Routing LayoutComponent={layout} />
      </AnimationContext.Provider>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Root;
