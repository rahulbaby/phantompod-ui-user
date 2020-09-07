import { instance } from 'lib';
import Cookies from 'universal-cookie';
import { AUTH_TOKEN_KEY } from 'config';
import {
  SIGN_IN,
  SIGN_IN_API,
  AUTHENTICATED,
  UNAUTHENTICATED,
  SIGN_OUT_API,
  CHECK_USER_API,
  IS_LOADING,
} from './constants';

const cookies = new Cookies();
const cookieOptions = {
  path: '/',
  //secure: true,
  session: false,
  hostOnly: false,
  //httpOnly: true,
  sameSite: true,
};

/* action creators */
export const signIn = (data) => (dispatch) => {
  return dispatch({
    type: SIGN_IN,
    payload: instance.get(`${SIGN_IN_API}`, data),
  });
};

export const authenticated = (data) => (dispatch) => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  cookies.set(AUTH_TOKEN_KEY, data.token, cookieOptions);
  return dispatch({
    type: AUTHENTICATED,
  });
};

export const singOut = () => async (dispatch) => {
  await localStorage.removeItem(AUTH_TOKEN_KEY);
  cookies.remove(AUTH_TOKEN_KEY, cookieOptions);
  return dispatch({
    type: UNAUTHENTICATED,
  });
  /*
  return instance.get( SIGN_OUT_API )
    .then(res=>{
      return dispatch({
         type : UNAUTHENTICATED,
      })
    })
  */
};

export const checkUser = () => (dispatch) => {
  dispatch({
    type: IS_LOADING,
  });
  return instance({
    method: 'post',
    url: CHECK_USER_API,
  }).then((res) => {
    if (res.user)
      return dispatch({
        payload: res.user,
        type: AUTHENTICATED,
      });
    else
      return dispatch({
        type: UNAUTHENTICATED,
      });
  });
};

export const refreshUser = () => (dispatch) => {
  return instance({
    method: 'post',
    url: CHECK_USER_API,
  }).then((res) => {
    if (res.user)
      return dispatch({
        payload: res.user,
        type: AUTHENTICATED,
      });
    else
      return dispatch({
        type: UNAUTHENTICATED,
      });
  });
};
