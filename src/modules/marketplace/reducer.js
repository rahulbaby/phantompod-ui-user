import _ from 'lodash';
import { REFRESH_ROWS, SET_LOADING, SET_PAGE, RESET_STORE } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';
import { isArray } from 'lib/functions';

export let initialState = {
  loading: true,
  rows: [],
  total: 0,
  error: false,
  page: 1,
  limit: 2,
};

let lastFetchValid;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case REFRESH_ROWS:
      return {
        ...state,
        error: false,
        rows: [...state.rows, ...action.payload.rows],
        total: action.payload.total,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default moduleReducer;
