import React from 'react';
import CardSection from './CardSection';
import { useItem } from 'hooks';
import { useRedux } from 'hooks';
import { isoToFormatted } from 'utils/functions';
import moment from 'moment';
import { showMessage } from 'store/messages/actions';
import SubscriptionCancelButton from './SubscriptionCancelButton';

const SubscriptionButton = ({ label = 'Upgrade to premium', setShowBillingForm }) => {
	const [showPayment, setShowPayment] = React.useState(false);
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	const handleClick = () => {
		if (user.isBillingAdded) setShowPayment(true);
		else {
			dispatch(showMessage('Pleaes add your billing details.', 'info'));
			setShowBillingForm(true);
		}
	};

	return (
		<React.Fragment>
			{showPayment ? (
				<CardSection onSuccess={() => setShowPayment(false)} />
			) : (
				<button className="btn small-btn subscription-btn" onClick={handleClick}>
					{label}
				</button>
			)}
		</React.Fragment>
	);
};

const SubscriptionCardTrial = ({ user, setShowBillingForm }) => {
	return (
		<div className="subscription-box box-shadow free-trail">
			<h3 className="subscription-head color-blue">Subscription</h3>
			<h5 className="subscription-type">Free Trail</h5>
			<p className="subscription-expiry">(Expires in 5 days)</p>
			<SubscriptionButton setShowBillingForm={setShowBillingForm} />
		</div>
	);
};

const SubscriptionCardPaid = ({ user }) => {
	return (
		<div className="subscription-box box-shadow premium-subscription">
			<h3 className="subscription-head color-blue">Subscription</h3>
			<h5 className="subscription-type">{user.status.toUpperCase()}</h5>

			{user.isActive ? (
				<React.Fragment>
					<p className="subscription-expiry">
						(Next billng on July {moment.unix(user.paymentExpiresAt).format('DD MMM YYYY hh:mm a')})
					</p>
					<SubscriptionCancelButton />
				</React.Fragment>
			) : (
				<SubscriptionButton label={`Subscribe`} />
			)}
		</div>
	);
};

const SubscriptionCard = ({ setShowBillingForm }) => {
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	return user.onTrial ? (
		<SubscriptionCardTrial user={user} setShowBillingForm={setShowBillingForm} />
	) : (
		<SubscriptionCardPaid user={user} setShowBillingForm={setShowBillingForm} />
	);
};

export default SubscriptionCard;
