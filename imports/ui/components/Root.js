import React from 'react';
// import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Routing from './Routing';
// import Loading from './Loading';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import AnimationContext from '../contexts/AnimationContext';

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
    </>
  );
};
// <CurrentUserContext.Provider value={currentUser}>
// </CurrentUserContext.Provider>
// <ToastContainer autoClose={3000} />

export default Root;
