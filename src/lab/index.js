import './CardSectionStyles.css';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Redirect } from 'react-router-dom';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { LayoutMain } from 'layouts';

export const products = [
	{
		key: 0,
		price: '$5.00',
		name: 'Basic',
		interval: 'month',
		billed: 'monthly',
	},
	{
		key: 1,
		price: '$15.00',
		name: 'Premium',
		interval: 'month',
		billed: 'monthly',
	},
];

export const productSelected = products[0];
export const customer = {
	id: 'cus_HVAclyYRKWavr3',
};

export const REACT_APP_STRIPE_PUBLISHABLE_KEY = 'pk_test_F1U8ZiSPK9gAcjttJZTUiwrZ';

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

if (!REACT_APP_STRIPE_PUBLISHABLE_KEY) {
	console.error('**Stripe publishable key environment variable not set**');
	console.error('**Add an environemnt variable REACT_APP_STRIPE_PUBLISHABLE_KEY**');
	console.error('**Replace .env.example with .env and **');
}

const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: '#32325d',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4',
			},
			border: '1px solid #ccc',
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
};

const CardForm = ({ handleSubmit, subscribing }) => (
	<div class="card ">
		<div className="card-body bg-gradient-light">
			Card details - 4242 4242 4242 4242 - 4000 0027 6000 3184
			<form id="payment-form" onSubmit={handleSubmit}>
				<CardElement options={CARD_ELEMENT_OPTIONS} />
				<button className="btn btn-success m-3" type="submit">
					{subscribing ? 'Subscribing...' : 'Subscribe'}
				</button>
			</form>
		</div>
	</div>
);

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [subscribing, setSubscribing] = useState(false);
	const [accountInformation, setAccountInformation] = useState(null);

	function handleCustomerActionRequired({
		subscription,
		invoice,
		priceId,
		paymentMethodId,
		isRetry,
	}) {
		if (subscription && subscription.status === 'active') {
			// subscription is active, no customer actions required.
			return { subscription, priceId, paymentMethodId };
		}

		// If it's a first payment attempt, the payment intent is on the subscription latest invoice.
		// If it's a retry, the payment intent will be on the invoice itself.
		let paymentIntent = invoice
			? invoice.payment_intent
			: subscription.latest_invoice.payment_intent;

		if (
			paymentIntent.status === 'requires_action' ||
			(isRetry === true && paymentIntent.status === 'requires_payment_method')
		) {
			return stripe
				.confirmCardPayment(paymentIntent.client_secret, {
					payment_method: paymentMethodId,
				})
				.then((result) => {
					if (result.error) {
						// start code flow to handle updating the payment details
						// Display error message in your UI.
						// The card was declined (i.e. insufficient funds, card has expired, etc)
						throw result;
					} else {
						if (result.paymentIntent.status === 'succeeded') {
							// There's a risk of the customer closing the window before callback
							// execution. To handle this case, set up a webhook endpoint and
							// listen to invoice.payment_succeeded. This webhook endpoint
							// returns an Invoice.
							return {
								priceId: priceId,
								subscription: subscription,
								invoice: invoice,
								paymentMethodId: paymentMethodId,
							};
						}
					}
				});
		} else {
			// No customer action needed
			return { subscription, priceId, paymentMethodId };
		}
	}

	function handlePaymentMethodRequired({ subscription, paymentMethodId, priceId }) {
		if (subscription.status === 'active') {
			// subscription is active, no customer actions required.
			return { subscription, priceId, paymentMethodId };
		} else if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
			// Using localStorage to store the state of the retry here
			// (feel free to replace with what you prefer)
			// Store the latest invoice ID and status
			localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
			localStorage.setItem(
				'latestInvoicePaymentIntentStatus',
				subscription.latest_invoice.payment_intent.status,
			);
			throw new Error({ error: { message: 'Your card was declined.' } });
		} else {
			return { subscription, priceId, paymentMethodId };
		}
	}

	function onSubscriptionComplete(result) {
		console.log(result);
		// Payment was successful. Provision access to your service.
		// Remove invoice from localstorage because payment is now complete.
		// clearCache();
		setAccountInformation(result);
		// Change your UI to show a success message to your customer.
		// onSubscriptionSampleDemoComplete(result);
		// Call your backend to grant access to your service based on
		// the product your customer subscribed to.
		// Get the product by using result.subscription.price.product
	}
	const apiUrl = 'http://localhost:4000/stripe/create-subscription';

	function createSubscription({ paymentMethodId }) {
		const priceId = productSelected.name.toUpperCase();
		return (
			fetch(apiUrl, {
				method: 'post',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					customerId: customer.id,
					paymentMethodId: paymentMethodId,
					priceId: priceId,
				}),
			})
				.then((response) => {
					return response.json();
				})
				// If the card is declined, display an error to the user.
				.then((result) => {
					if (result.error) {
						// The card had an error when trying to attach it to a customer
						throw result;
					}
					return result;
				})
				// Normalize the result to contain the object returned
				// by Stripe. Add the addional details we need.
				.then((result) => {
					return {
						// Use the Stripe 'object' property on the
						// returned result to understand what object is returned.
						subscription: result,
						paymentMethodId: paymentMethodId,
						priceId: productSelected.name,
					};
				})
				// Some payment methods require a customer to do additional
				// authentication with their financial institution.
				// Eg: 2FA for cards.
				.then(handleCustomerActionRequired)
				// If attaching this card to a Customer object succeeds,
				// but attempts to charge the customer fail. You will
				// get a requires_payment_method error.
				.then(handlePaymentMethodRequired)
				// No more actions required. Provision your service for the user.
				.then(onSubscriptionComplete)
				.catch((error) => {
					// An error has happened. Display the failure to the user here.
					// We utilize the HTML element we created.
					console.log(error);
					// displayError(error);
				})
		);
	}

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		setSubscribing(true);

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			console.log('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
			createSubscription({ paymentMethodId: paymentMethod.id });
		}
	};

	if (accountInformation) {
		return (
			<Redirect
				to={{
					pathname: '/account',
					state: { accountInformation: accountInformation },
				}}
			/>
		);
	} else {
		return <CardForm handleSubmit={handleSubmit} subscribing={subscribing} />;
	}
};

const PaymentForm = (props) => (
	<Elements stripe={stripePromise}>
		<CheckoutForm {...props} />
	</Elements>
);

export default () => (
	<LayoutMain>
		{' '}
		<PaymentForm />
	</LayoutMain>
);
