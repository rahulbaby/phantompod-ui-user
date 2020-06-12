import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LoaderCircular } from 'components/loaders';
import { fetchRows } from 'store/items/actions';

const useQuery = (name) => {
  let query = new URLSearchParams(useLocation().search);
  return query;
};

const DataFetchWrapper = (props) => {
  const dispatch = useDispatch();
  const { isLoading, rows, lastFetchValid } = useSelector(({ items }) => items);

  useEffect(() => {
    dispatch(fetchRows());
  }, []);

  let cont = props.children || null;

  if ((isLoading && !lastFetchValid) || !Object.keys(rows).length) cont = <LoaderCircular />;
  return <Fragment>{cont}</Fragment>;
};

export default DataFetchWrapper;
