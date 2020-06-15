import _ from 'lodash';
import { FETCH_ROWS, FETCH_ROWS_API, REFRESH_ROWS, REMOVE_ROW, ADD_ROW } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';
import { isArray } from 'lib/functions';

let initialState = {
  loading: true,
  rows: [],
  total: 0,
  error: false,
};

let lastFetchValid;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_ROWS}${PENDING}`:
      return {
        ...state,
        loading: true,
        error: false,
        lastFetchValid,
      };

    case `${FETCH_ROWS}${FULFILLED}`:
      return {
        ...state,
        loading: false,
        rows: [], //...state.rows, ...action.payload.docs
        total: action.payload.total,
      };

    case `${FETCH_ROWS}${REJECTED}`:
      return {
        ...state,
        error: true,
      };

    case REFRESH_ROWS:
      return {
        ...state,
        error: true,
        rows: action.payload.rows,
        total: action.payload.total,
      };

    case REMOVE_ROW:
      return {
        ...state,
        error: true,
        rows: state.rows.filter((x) => x._id != action.payload),
        total: state.total - 1,
      };

    case ADD_ROW:
      return {
        ...state,
        error: true,
        rows: [action.payload, ...state.rows],
        total: state.total + 1,
      };

    default:
      return state;
  }
};

export default moduleReducer;
