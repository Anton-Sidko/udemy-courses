// import { useState } from 'react';
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import { cartItemType, orderFormErrors, orderType } from '../../types';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';

const fakeCart: cartItemType[] = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

const CreateOrder = function (): React.JSX.Element {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData() as Awaited<ReturnType<typeof action>>;

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form
        method="POST"
        // action="/order/new"
      >
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
            />
          </div>
          {formErrors && 'phone' in formErrors && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
};

const action = async function ({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === 'on',
  };

  const errors: orderFormErrors = {};

  if (!isValidPhone((order as orderType).phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything OK create new order
  const newOrder = await createOrder(order as orderType);

  return redirect(`/order/${newOrder.id}`);
};

// eslint-disable-next-line react-refresh/only-export-components
export { action };

export default CreateOrder;

