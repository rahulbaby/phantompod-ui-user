import instance from 'lib/instance';
import { FETCH_ROWS, FETCH_ROWS_API } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';
import { singOut } from 'modules/auth/actions';

/* action creators */
export const fetchRows = () => (dispatch) => {
  instance.get(`${FETCH_ROWS_API}`, {}).then((res) => {
    if (res.status === 401) dispatch(singOut());
    else
      return dispatch({
        type: `${FETCH_ROWS}${FULFILLED}`,
        payload: res,
      });
  });
};
