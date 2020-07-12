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
