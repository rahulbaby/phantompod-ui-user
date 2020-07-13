import React from 'react';
import { useRouter } from 'hooks';
import { useRedux } from 'hooks';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { instance } from 'utils';

const TrialSubscriptionButton = ({ onSuccess }) => {
	const [loading, setLoading] = React.useState(false);
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	const handleClick = () => {
		setLoading(true);
		instance.post('user/create-trial-subscription').then((res) => {
			setTimeout(() => {
				dispatch(showMessage('Success', 'success'));
				dispatch(refreshUser());
				///onSuccess && onSuccess();
			}, 2000);
		});
	};

	return (
		<React.Fragment>
			<button className="btn small-btn" onClick={handleClick} disabled={loading}>
				{loading ? 'Subscribing..' : 'Try Phantompod'}
			</button>
		</React.Fragment>
	);
};

const UserPlanSelection = () => {
	const { history, location } = useRouter();
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;
	const userStatus = user ? user.status : null;

	React.useEffect(() => {
		if (userStatus !== null) history.push('/settings');
	}, [userStatus]);
	return (
		<React.Fragment>
			<div className="title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Please select a plan to start using Phantompod</h4>
				</div>
			</div>

			<div className="plans-list-wrapper">
				<div className="plan-list-single box-shadow free-plan">
					<h3 className="subscription-head">Free Trial</h3>
					<div className="plan-price">
						<span className="currency">$</span>0<p className="price-title">Free for 14 days</p>
					</div>
					<ul className="plan-specs">
						<li className="plan-includes">Join upto 20 Pods</li>
						<li className="plan-includes">Create upto 10 Pods</li>
						<li className="plan-includes">Submit 5 posts per day</li>
						<li className="plan-includes">Basic Pods</li>
						<li className="not-includes">Dedicated support</li>
					</ul>
					<TrialSubscriptionButton onSuccess={() => history.push('/settings')} />
				</div>
				<div className="plan-list-single box-shadow premium-plan">
					<h3 className="subscription-head">Premium</h3>
					<div className="plan-price">
						<span className="currency">$</span>12
						<p className="price-title">Per month</p>
					</div>
					<ul className="plan-specs">
						<li className="plan-includes">Join upto 20 Pods</li>
						<li className="plan-includes">Create upto 10 Pods</li>
						<li className="plan-includes">Submit 5 posts per day</li>
						<li className="plan-includes">Basic Pods</li>
						<li className="plan-includes">Dedicated support</li>
					</ul>
					<button className="btn small-btn" onClick={() => history.push('/premium-subscription')}>
						Phantompod Subscription
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default UserPlanSelection;