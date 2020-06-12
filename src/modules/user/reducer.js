import _ from 'lodash';
import { FETCH_ROWS, FETCH_ROWS_API } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';
import { isArray } from 'lib/functions';

let initialState = {
  isLoading: true,
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
        isLoading: true,
        error: false,
        lastFetchValid,
      };

    case `${FETCH_ROWS}${FULFILLED}`:
      return {
        ...state,
        isLoading: false,
      };

    case `${FETCH_ROWS}${REJECTED}`:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default moduleReducer;
