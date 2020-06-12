import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import REDUX_PROMISE_AXIOS from 'redux-promise-axios';

const middlewares = (history) => {
  if (process.env.NODE_ENV === 'production')
    return applyMiddleware(routerMiddleware(history), thunk, promise, REDUX_PROMISE_AXIOS);
  return applyMiddleware(
    routerMiddleware(history),
    createLogger(),
    thunk,
    promise,
    REDUX_PROMISE_AXIOS,
  );
};

export default middlewares;
