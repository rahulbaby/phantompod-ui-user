import React from 'react';
import { useItem } from 'hooks';
import { useRedux } from 'hooks';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { instance } from 'utils';
import { LoaderPage } from 'components/loaders';

const SubscriptionCancelButton = ({ onSuccess }) => {
	const [loading, setLoading] = React.useState(false);
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	const handleClick = () => {
		setLoading(true);
		instance.post('stripe/cancel-subscription').then(({ error }) => {
			setTimeout(() => {
				dispatch(
					showMessage(
						error ? error.message || 'Something went wrong!' : 'Success',
						error ? 'danger' : 'success',
					),
				);
				dispatch(refreshUser());
				if (error) setLoading(false);
				else onSuccess && onSuccess();
			}, 5000);
		});
	};

	return (
		<React.Fragment>
			{loading && <LoaderPage />}
			<button className="btn small-btn subscription-btn" onClick={handleClick} disabled={loading}>
				{loading ? 'Cancelling..' : 'Cancel subscription'}
			</button>
		</React.Fragment>
	);
};

export default SubscriptionCancelButton;
