import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage.js';
import Login from './Login.js';
import NotFoundPage from './NotFoundPage';
import Users from './admin/Users';
// import Settings from './Settings';
// import Messages from './Messages';

const Routing = ({ LayoutComponent }) => {
  const LoadingLayout = LayoutComponent;
  return (
    <Router>
      <div className="transition-container">
        <LoadingLayout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact>
              <NotFoundPage />
            </Route>
          </Switch>
        </LoadingLayout>
      </div>
    </Router>
  );
};

Routing.propTypes = {
  LayoutComponent: PropTypes.func,
};

export default Routing;
