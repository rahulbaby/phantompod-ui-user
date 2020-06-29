import React from 'react';
import './index.css';
import App from './App';
import Prices from './Prices';
import PaymentForm from './PaymentForm';

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

export default () => <PaymentForm />;
