import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import Login from 'modules/auth';
import PodList from 'modules/pod/MyPods';
import PodSettings from 'modules/pod/Settings';
import SignUp from 'modules/auth/SignUp';
import Lab from 'lab';

const routes = [
  {
    path: '/',
    exact: true,
    component: Lab,
  },
  {
    path: '/pod/settings',
    exact: true,
    component: PodSettings,
  },
  {
    path: '/pod/list',
    exact: true,
    component: PodList,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp,
  },
  {
    path: '*',
    component: NotFound,
  },
];

class AppRouter extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          {routes.map(({ exact, path, component, ...rest }, idx) => (
            <Route key={idx} exact={exact} path={path} component={component} {...rest} />
          ))}
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ items, auth }) => {
  let { isLoading, rows } = items;
  return { isLoading, rows };
};

export default withRouter(connect(mapStateToProps)(AppRouter));
