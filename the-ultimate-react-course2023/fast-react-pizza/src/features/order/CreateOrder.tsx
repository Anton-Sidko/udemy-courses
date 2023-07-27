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

import Button from '../../ui/Button';

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
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form
        method="POST"
        // action="/order/new"
      >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:shrink-0 sm:basis-36">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:shrink-0 sm:basis-36">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors && 'phone' in formErrors && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:shrink-0 sm:basis-36">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
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
