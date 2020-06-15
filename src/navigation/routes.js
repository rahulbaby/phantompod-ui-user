import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import Lab from 'lab';
import Login from 'modules/auth';
import SignUp from 'modules/auth/SignUp';

import PodList from 'modules/pod/MyPods';
import PodSettings from 'modules/pod/Settings';
import PodMembers from 'modules/pod/Members';
import NotificationPage from 'modules/notification';

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
    path: '/pod/members',
    exact: true,
    component: PodMembers,
  },
  {
    path: '/pod/list',
    exact: true,
    component: PodList,
  },
  {
    path: '/notifications',
    exact: true,
    component: NotificationPage,
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
