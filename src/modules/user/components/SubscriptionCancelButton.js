import React from 'react';
import { useItem } from 'hooks';
import { useRedux } from 'hooks';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { instance } from 'utils';

const SubscriptionCancelButton = ({ onSuccess }) => {
	const [loading, setLoading] = React.useState(false);
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	const handleClick = () => {
		setLoading(true);
		instance.post('stripe/cancel-subscription').then((res) => {
			setTimeout(() => {
				dispatch(showMessage('Success', 'success'));
				dispatch(refreshUser());
				onSuccess && onSuccess();
			}, 5000);
		});
	};

	return (
		<React.Fragment>
			<button className="btn small-btn subscription-btn" onClick={handleClick} disabled={loading}>
				{loading ? 'Cancelling..' : 'Cancel subscription'}
			</button>
		</React.Fragment>
	);
};

export default SubscriptionCancelButton;
