import { instance } from 'lib';
import { FETCH_ROWS, FETCH_ROWS_API } from './constants';

/* action creators */
export const fetchRows = () => (dispatch) => {
  return dispatch({
    type: FETCH_ROWS,
    payload: instance.get(`${FETCH_ROWS_API}`, {}),
  });
};
