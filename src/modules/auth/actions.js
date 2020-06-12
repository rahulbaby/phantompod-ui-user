import { instance } from 'lib';
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

/* action creators */
export const signIn = (data) => (dispatch) => {
  return dispatch({
    type: SIGN_IN,
    payload: instance.get(`${SIGN_IN_API}`, data),
  });
};

export const authenticated = (data) => (dispatch) => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  return dispatch({
    type: AUTHENTICATED,
  });
};

export const singOut = () => (dispatch) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
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
