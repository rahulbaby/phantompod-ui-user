import { createReduxCall } from 'lib';
import { REFRESH_ROWS, SET_LOADING, SET_PAGE } from './constants';

/* action creators */

export const fetchRows = (dispatch) => (page, limit = 2) => {
	dispatch({
		type: SET_LOADING,
	});
	createReduxCall('post', { options: { page, limit } }).then(({ docs, total }) => {
		dispatch({
			type: REFRESH_ROWS,
			payload: { rows: docs, total },
		});
	});
};

export const setPage = (dispatch) => (page) => {
	dispatch({
		type: SET_PAGE,
		payload: { page },
	});
	fetchRows(dispatch)(page);
};
