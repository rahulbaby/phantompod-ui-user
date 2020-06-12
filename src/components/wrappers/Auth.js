import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LoaderCircular } from 'components/loaders';
import { checkUser } from 'modules/auth/actions';
const WrapperAuth = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const auth = useSelector(({ auth }) => auth);
  const { isLoading, authenticated, error, lastFetchValid } = auth;
  useEffect(() => {
    if (!authenticated && !isLoading) history.push('/login?page=' + location.pathname);
  }, [authenticated, isLoading]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  let cont = props.children || null;

  if ((isLoading && !lastFetchValid) || !authenticated) cont = <LoaderCircular />;
  return <Fragment>{cont}</Fragment>;
};

export default WrapperAuth;
