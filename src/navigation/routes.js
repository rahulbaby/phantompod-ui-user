import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import Lab from 'lab';
import Login from 'modules/auth';
import SignUp from 'modules/auth/SignUp';
import Logout from 'modules/auth/Logout';

import Dashboard from 'modules/dashboard';
import NotificationPage from 'modules/notification';
import PodList from 'modules/pod/MyPods';
import PodSettings from 'modules/pod/Settings';
import PodMembers from 'modules/pod/Members';
import Marketplace from 'modules/marketplace';
import PodPosts from 'modules/post';
import UserProfile from 'modules/user';
import Support from 'modules/pages/Support';
import Notice from 'modules/pages/Notice';
import UserPlanSelection from 'modules/user/PlanSelection';
import UserSubscription from 'modules/user/Subscription';
import VerifyEmail from 'modules/pages/VerifyEmail';
import VerifyEmailPrompt from 'modules/pages/VerifyEmailPrompt';

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
    path: '/pod/create-new',
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
    path: '/pod/details/:_id',
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
    path: '/plan-selction',
    exact: true,
    component: UserPlanSelection,
  },
  {
    path: '/premium-subscription',
    exact: true,
    component: UserSubscription,
  },
  {
    path: '/logout',
    exact: true,
    component: Logout,
  },
  {
    path: '/verify-email',
    exact: true,
    component: VerifyEmail,
  },
  {
    path: '/verify-email-prompt',
    exact: true,
    component: VerifyEmailPrompt,
  },
  {
    path: '/notice',
    exact: true,
    component: Notice,
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
