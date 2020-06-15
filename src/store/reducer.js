import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import items from './items/reducer';
import messages from './messages/reducer';
import notification from 'modules/notification/reducer';
import auth from 'modules/auth/reducer';
import user from 'modules/user/reducer';
import pod from 'modules/pod/reducer';

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		items,
		messages,
		auth,
		user,
		notification,
		pod,
	});
