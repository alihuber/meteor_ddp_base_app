import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from './Loading';

const HomePage = lazy(() => import('./HomePage'));
const Login = lazy(() => import('./Login'));
const Users = lazy(() => import('./admin/Users'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));
const renderLoader = () => <Loading />;

const Routing = ({ LayoutComponent }) => {
  const LoadingLayout = LayoutComponent;
  return (
    <Router>
      <div className="transition-container">
        <LoadingLayout>
          <Switch>
            <Route exact path="/">
              <Suspense fallback={renderLoader()}>
                <HomePage />
              </Suspense>
            </Route>
            <Route exact path="/login">
              <Suspense fallback={renderLoader()}>
                <Login />
              </Suspense>
            </Route>
            <Route exact path="/users">
              <Suspense fallback={renderLoader()}>
                <Users />
              </Suspense>
            </Route>
            <Route exact>
              <Suspense fallback={renderLoader()}>
                <NotFoundPage />
              </Suspense>
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
