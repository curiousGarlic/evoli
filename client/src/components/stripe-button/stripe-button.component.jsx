import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_HcmugIPIUtSRflMk9XKKDigr00EJbvcXsd';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment Successful')
    }).catch(error => {
      console.log('Payment Error ', JSON.parse(error));
      alert('There was an issue with your payment. Please make sure you use the provided card')
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='EVOLI'
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
