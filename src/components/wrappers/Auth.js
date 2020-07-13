import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LoaderCircular } from 'components/loaders';
import { checkUser } from 'modules/auth/actions';
const WrapperAuth = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const pathname = location.pathname;
  const pathnamePlanSelectionArr = ['/plan-selction', '/premium-subscription'];
  const pathnameEmailVerArr = ['/verify-email', '/verify-email-prompt'];

  const auth = useSelector(({ auth }) => auth);
  const { isLoading, authenticated, error, lastFetchValid } = auth;
  const emailVerified = authenticated ? !auth.user.emailVerified : false;

  useEffect(() => {
    if (!authenticated && !isLoading) history.push('/login?page=' + pathname);
  }, [authenticated, isLoading]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    if (authenticated && !auth.user.emailVerified && !pathnameEmailVerArr.includes(pathname))
      history.push('/verify-email-prompt');
    else if (
      authenticated &&
      auth.user.status === null &&
      ![...pathnamePlanSelectionArr, ...pathnameEmailVerArr].includes(pathname)
    )
      history.push('/plan-selction');
  }, [pathname]);

  let cont = props.children || null;
  if (
    (isLoading && !lastFetchValid) ||
    !authenticated ||
    !auth.user ||
    !Object.keys(auth.user).length
  )
    cont = <LoaderCircular />;

  return <Fragment>{cont}</Fragment>;
};

export default WrapperAuth;
