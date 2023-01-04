import { loadStripe } from '@stripe/stripe-js';

//INFO I haven't actual publish key, because I don't register on Stripe(my country isn't on list😑)
export const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
