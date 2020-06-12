import { ADD_MESSAGE, CLEAR_MESSAGE_ALL, CLEAR_MESSAGE } from './constants';

let initialState = {
  rows: [],
};

let lastFetchValid;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        rows: [...state.rows, action.payload],
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        rows: state.rows.filter((x) => x.id !== action.payload),
      };

    case CLEAR_MESSAGE_ALL: {
      return { rows: [] };
    }
    default:
      return state;
  }
};

export default moduleReducer;
