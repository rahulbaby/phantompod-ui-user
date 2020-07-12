import React from 'react';
import { instance } from 'utils';

export default () => {
	const resetUserData = () => {
		instance.get('user/reset-user');
	};
	return (
		<button className="btn small-btn subscription-btn" onClick={resetUserData}>
			RESET
		</button>
	);
};
