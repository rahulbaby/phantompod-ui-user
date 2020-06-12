import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import items from './items/reducer';
import messages from './messages/reducer';
import user from 'modules/user/reducer';
import auth from 'modules/auth/reducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    items,
    messages,
    auth,
    user,
  });
