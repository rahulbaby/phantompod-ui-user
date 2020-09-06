import React from 'react';
import { LayoutMain } from 'layouts';
import { useRedux, useRouter } from 'hooks';
import UserBillingForm from './components/BillingForm';
import CardSection from './components/CardSection';

const UserSubscription = () => {
	const [showCardSection, setShowCardSection] = React.useState(false);
	const [showBillingForm, setShowBillingForm] = React.useState(true);
	const { getReduxItem } = useRedux();
	const { history } = useRouter();
	const authData = getReduxItem('auth');
	const userData = authData.user;
	return (
		<React.Fragment>
			<div className="title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">
						{showBillingForm ? 'Billing Information' : 'Secure Payment'}
					</h4>
				</div>
			</div>
			{showBillingForm && (
				<UserBillingForm
					onSuccess={() => {
						setShowBillingForm(false);
						setShowCardSection(true);
					}}
				/>
			)}
			{showCardSection && <CardSection onSuccess={() => history.replace('/settings')} />}
		</React.Fragment>
	);
};

export default () => (
	<LayoutMain>
		<UserSubscription />
	</LayoutMain>
);
