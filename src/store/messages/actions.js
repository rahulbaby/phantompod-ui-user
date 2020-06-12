import { instance } from 'lib';
import { ADD_MESSAGE, CLEAR_MESSAGE_ALL, CLEAR_MESSAGE } from './constants';

/* action creators */
export const showMessage = (text, severity = 'info') => (dispatch) => {
  return dispatch({
    type: ADD_MESSAGE,
    payload: { id: Date.now(), text, severity },
  });
};

export const clearMessages = (text, severity = 'info') => (dispatch) => {
  return dispatch({
    type: CLEAR_MESSAGE_ALL,
  });
};

export const clearMessage = (id) => (dispatch) => {
  return dispatch({
    type: CLEAR_MESSAGE,
    payload: id,
  });
};
