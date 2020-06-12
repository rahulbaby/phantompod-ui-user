import _ from 'lodash';
import { SIGN_IN, SIGN_IN_API, AUTHENTICATED, UNAUTHENTICATED, IS_LOADING } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';

let initialState = {
  isLoading: true,
  authenticated: false,
  error: false,
  user: null,
  lastFetchValid: false,
};

let lastFetchValid;
const validityDuration = 10;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        lastFetchValid: lastFetchValidCheck(state, validityDuration),
      };

    case `${SIGN_IN}${PENDING}`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case `${SIGN_IN}${FULFILLED}`:
      return {
        ...state,
        isLoading: false,
        lastFetch: new Date(),
      };

    case `${SIGN_IN}${REJECTED}`:
      return {
        ...state,
        error: true,
      };
    case `${AUTHENTICATED}`:
      return {
        ...state,
        user: action.payload || {},
        authenticated: true,
        isLoading: false,
        lastFetch: new Date(),
      };
    case `${UNAUTHENTICATED}`:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default moduleReducer;
