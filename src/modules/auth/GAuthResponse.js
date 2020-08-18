import React, { useEffect, Fragment, useState } from 'react';
import { LayoutAuth } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { authenticated } from 'modules/auth/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { showMessage } from 'store/messages/actions';

const useQuery = (name) => {
  let query = new URLSearchParams(useLocation().search);
  return query;
};

export default () => {
  const { dispatch } = useRedux();
  let history = useHistory();
  let location = useLocation();
  let query = useQuery();

  useEffect(() => {
    const token = query.get('token');
    if (token) {
      dispatch(showMessage('Success', 'success'));
      dispatch(authenticated({ token }));
      history.replace('login');
    } else {
      dispatch(showMessage('Something went wrong', 'danger'));
      history.replace('login');
    }
  }, []);
  return (
    <LayoutAuth>
      <div style={{ textAlign: 'center' }}>
        <LoaderCircular />
      </div>
    </LayoutAuth>
  );
};
