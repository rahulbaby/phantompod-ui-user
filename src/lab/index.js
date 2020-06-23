import React from 'react';
import { LayoutMain } from 'layouts';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_F1U8ZiSPK9gAcjttJZTUiwrZ');

const Lab = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default () => (
	<LayoutMain>
		<Lab />
	</LayoutMain>
);
