import _ from 'lodash';
import { FETCH_ROWS, FETCH_ROWS_API } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';
import { isArray } from 'lib/functions';

let initialState = {
  isLoading: true,
  rows: {},
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
        lastFetchValid: lastFetchValidCheck(state),
      };

    case `${FETCH_ROWS}${FULFILLED}`:
      return {
        ...state,
        error: false,
        isLoading: false,
        rows: action.payload.status ? [] : action.payload,
        lastFetch: new Date(),
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
