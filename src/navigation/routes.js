import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import Lab from 'lab';
import Login from 'modules/auth';
import SignUp from 'modules/auth/SignUp';

import Dashboard from 'modules/dashboard';
import NotificationPage from 'modules/notification';
import PodList from 'modules/pod/MyPods';
import PodSettings from 'modules/pod/Settings';
import PodMembers from 'modules/pod/Members';
import Marketplace from 'modules/marketplace';
import PodPosts from 'modules/post';
import UserProfile from 'modules/user';
import Support from 'modules/pages/Support';

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/lab',
    exact: true,
    component: Lab,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
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
    path: '/marketplace',
    exact: true,
    component: Marketplace,
  },
  {
    path: '/marketplace/:_id',
    exact: true,
    component: PodPosts,
  },
  {
    path: '/settings',
    exact: true,
    component: UserProfile,
  },
  {
    path: '/notifications',
    exact: true,
    component: NotificationPage,
  },
  {
    path: '/support',
    exact: true,
    component: Support,
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
