import { createReduxCall } from 'lib';
import { REFRESH_ROWS, FETCH_ROWS, FETCH_ROWS_API, REMOVE_ROW, ADD_ROW } from './constants';

/* action creators */
export const fetchRows = (query = {}, options = {}) => (dispatch) => {
	return dispatch({
		type: FETCH_ROWS,
		payload: createReduxCall(`${FETCH_ROWS_API}`, { query, options }),
	});
};

export const refreshRows = (rows, total) => (dispatch) => {
	return dispatch({
		type: REFRESH_ROWS,
		payload: { rows, total },
	});
};

export const removeRow = (_id) => (dispatch) => {
	return dispatch({
		type: REMOVE_ROW,
		payload: _id,
	});
};

export const addRow = (row) => (dispatch) => {
	return dispatch({
		type: ADD_ROW,
		payload: row,
	});
};
