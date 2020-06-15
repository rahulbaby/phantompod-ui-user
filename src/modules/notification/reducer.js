import { FETCH_ROWS, FETCH_ROWS_API } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';

let initialState = {
  isLoading: true,
  rows: [],
  total: 0,
  page: 0,
  error: false,
};

let lastFetchValid;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_ROWS}${PENDING}`:
      return {
        ...state,
        isLoading: true,
        error: false,
        lastFetchValid,
      };

    case `${FETCH_ROWS}${FULFILLED}`:
      return {
        ...state,
        isLoading: false,
        rows: action.payload.docs,
        total: action.payload.total,
        page: action.payload.page,
      };

    case `${FETCH_ROWS}${REJECTED}`:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default moduleReducer;
