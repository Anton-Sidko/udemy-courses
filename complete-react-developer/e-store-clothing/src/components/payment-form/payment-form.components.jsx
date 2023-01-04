import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;

    // INFO don't work because I haven't Stripe key and not log in in Netlify
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then(res => res.json());

    // const clientSecret = response.paymentIntent.client_secret;
    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Test username',
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
