import React from 'react';
import CardSection from './CardSection';

const SubscriptionCard = () => {
	const [showPayment, setShowPayment] = React.useState(true);

	return (
		<React.Fragment>
			{showPayment ? (
				<div
					className="subscription-box box-shadow free-trail bg-gradient-light"
					style={{ width: '100% !important' }}
				>
					<CardSection />
				</div>
			) : (
				<div className="subscription-box box-shadow free-trail">
					<h3 className="subscription-head color-blue">Subscription</h3>
					<h5 className="subscription-type">Free Trail</h5>
					<p className="subscription-expiry">(Expires in 5 days)</p>
					<button className="btn small-btn subscription-btn" onClick={() => setShowPayment(true)}>
						Upgrade to premium
					</button>
				</div>
			)}
		</React.Fragment>
	);
};

export default SubscriptionCard;
