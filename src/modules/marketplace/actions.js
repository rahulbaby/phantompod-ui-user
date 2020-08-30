import { createReduxCall } from 'utils';
import { FETCH_ROWS_API, REFRESH_ROWS, SET_LOADING, SET_PAGE } from './constants';
import { isArray } from 'utils/functions';
/* action creators */

export const fetchRows = (dispatch) => (page, search, limit = 5) => {
	dispatch({
		type: SET_LOADING,
	});
	createReduxCall(FETCH_ROWS_API, { options: { page, limit }, search }).then(({ docs, total }) => {
		dispatch({
			type: REFRESH_ROWS,
			payload: { rows: isArray(docs) ? docs : [], total },
		});
	});
};

export const setPage = (dispatch) => (page, search = '') => {
	dispatch({
		type: SET_PAGE,
		payload: { page },
	});
	fetchRows(dispatch)(page, search);
};
