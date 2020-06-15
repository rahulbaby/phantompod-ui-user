import React from 'react';
import { useDispatch } from 'react-redux';
import { showMessage as triggerMsg } from 'store/messages/actions';

export default () => {
	const dispatch = useDispatch();
	const showMessage = (message, severity) => dispatch(triggerMsg(message, severity));
	return [showMessage];
};
