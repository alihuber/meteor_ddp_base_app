import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ServerConnectionContext from '../contexts/ServerConnectionContext';
import publicLayout from './layout/publicLayout';
import loggedInLayout from './layout/loggedInLayout';
import loggedInMobileLayout from './layout/loggedInMobileLayout';

const LayoutComponent = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const connectionStatus = useContext(ServerConnectionContext);
  const currentUser = useContext(CurrentUserContext);
  const [collapsed, setCollapsed] = useState(true);
  const handleMediaQueryChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleMediaQueryChange);
    window.addEventListener('orientationchange', handleMediaQueryChange);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }, undefined, handleMediaQueryChange);
  const paddingStr = isTabletOrMobile ? '0' : '0 50px';
  if (currentUser && !isTabletOrMobile) {
    return loggedInLayout(currentUser, children, paddingStr, width, collapsed, setCollapsed, isTabletOrMobile, connectionStatus, history);
  } else if (currentUser && isTabletOrMobile) {
    return loggedInMobileLayout(children, paddingStr, width, collapsed, setCollapsed, isTabletOrMobile, connectionStatus);
  } else {
    return publicLayout(children, paddingStr, width, isTabletOrMobile, connectionStatus);
  }
};

LayoutComponent.propTypes = {
  children: PropTypes.object,
};

export default LayoutComponent;
