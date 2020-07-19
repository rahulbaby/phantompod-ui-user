import { createReduxCall } from 'lib';
import { REFRESH_ROWS, SET_LOADING, SET_PAGE } from './constants';

/* action creators */

export const fetchRows = (dispatch) => (page, id, limit = 5) => {
	dispatch({
		type: SET_LOADING,
	});
	createReduxCall('post', { options: { page, limit }, query: { podId: id } }).then(
		({ docs, total }) => {
			dispatch({
				type: REFRESH_ROWS,
				payload: { rows: docs, total },
			});
		},
	);
};

export const setPage = (dispatch) => (page, id) => {
	dispatch({
		type: SET_PAGE,
		payload: { page },
	});
	fetchRows(dispatch)(page, id);
};
