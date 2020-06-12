import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LoaderCircular } from 'components/loaders';
import { checkUser } from 'modules/auth/actions';

const useQuery = (name) => {
  let query = new URLSearchParams(useLocation().search);
  return query;
};

const WrapperNoAuth = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector(({ auth }) => auth);
  const { isLoading, authenticated, error } = auth;
  let query = useQuery();

  useEffect(() => {
    if (authenticated && !isLoading) history.push(query.get('page') || '/');
  }, [authenticated, isLoading]);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  let cont = props.children || null;

  if (isLoading) cont = <LoaderCircular />;
  return <Fragment>{cont}</Fragment>;
};

export default WrapperNoAuth;
