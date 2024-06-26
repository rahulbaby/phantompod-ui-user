/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.css';

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
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection() {
  return (
    <div>
      Card details - 4242 4242 4242 4242 - 4000 0027 6000 3184
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

export default CardSection;
