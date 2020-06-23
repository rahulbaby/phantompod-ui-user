import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { instance } from 'utils';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const apiUrl = 'http://localhost:4000/stripe/create-subscription';
export function createSubscription({ customerId, paymentMethodId, priceId }) {
  return (
    fetch(apiUrl, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerId,
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
          // The card had an error when trying to attach it to a customer.
          throw result;
        }
        return result;
      })
      // Normalize the result to contain the object returned by Stripe.
      // Add the addional details we need.
      .then((result) => {
        return {
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          subscription: result,
        };
      })
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      .then(handleCustomerActionRequired)
      // If attaching this card to a Customer object succeeds,
      // but attempts to charge the customer fail, you
      // get a requires_payment_method error.
      .then(handlePaymentMethodRequired)
      // No more actions required. Provision your service for the user.
      .then(onSubscriptionComplete)
      .catch((error) => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        console.log('showCardError', error.response);
        // showCardError(error);
      })
  );
}

function onSubscriptionComplete(result) {
  // Payment was successful.
  if (result.subscription.status === 'active') {
    alert('Success');
    // Change your UI to show a success message to your customer.
    // Call your backend to grant access to your service based on
    // `result.subscription.items.data[0].price.product` the customer subscribed to.
  }
}

const handleCustomerActionRequired = async ({
  subscription,
  invoice,
  priceId,
  paymentMethodId,
  isRetry,
}) => {
  console.log({
    subscription,
    invoice,
    priceId,
    paymentMethodId,
    isRetry,
  });
  if (subscription && subscription.status === 'active') {
    // Subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId };
  }

  // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
  // If it's a retry, the payment intent will be on the invoice itself.
  let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

  if (
    paymentIntent.status === 'requires_action' ||
    (isRetry === true && paymentIntent.status === 'requires_payment_method')
  ) {
    const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    return stripe
      .confirmCardPayment(paymentIntent.client_secret, {
        payment_method: paymentMethodId,
      })
      .then((result) => {
        if (result.error) {
          // Start code flow to handle updating the payment details.
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc).
          throw result;
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer.
            // There's a risk of the customer closing the window before the callback.
            // We recommend setting up webhook endpoints later in this guide.
            return {
              priceId: priceId,
              subscription: subscription,
              invoice: invoice,
              paymentMethodId: paymentMethodId,
            };
          }
        }
      })
      .catch((error) => {
        console.log('displayError', error);
        //displayError(error);
      });
  } else {
    // No customer action needed.
    return { subscription, priceId, paymentMethodId };
  }
};

function handlePaymentMethodRequired({ subscription, paymentMethodId, priceId }) {
  if (subscription.status === 'active') {
    // subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId };
  } else if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
    localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
    localStorage.setItem(
      'latestInvoicePaymentIntentStatus',
      subscription.latest_invoice.payment_intent.status,
    );
    throw { error: { message: 'Your card was declined.' } };
  } else {
    return { subscription, priceId, paymentMethodId };
  }
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    return stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })
      .then((result) => {
        if (result.error) {
          console.log('error', result);
        } else {
          createSubscription({
            customerId: 'cus_HVAclyYRKWavr3',
            paymentMethodId: result.paymentMethod.id,
            priceId: 'price_1GwA8xBrW3Gw5uscGm2NEJlE',
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
      <div id="card-element-errors"></div>
    </form>
  );
}
