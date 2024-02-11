import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearcartItems, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';

import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { status, address, error, username, position } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(getCart);

  const isSubmitting = navigation.state === 'submitting';
  const isLoading = status === 'loading';

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalprice = totalCartPrice + priorityPrice;
  const formErrors = useActionData();
  console.log(formErrors);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-6  py-4'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            type='text'
            name='customer'
            required
            className='input grow'
            defaultValue={username}
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' name='phone' required className='input w-full' />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-4 text-xs text-red-700 '>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              className='input w-full'
              defaultValue={address}
              disabled={isLoading}
            />
            {status === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-4 text-xs text-red-700 '>{error}</p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className=' absolute bottom-[3px] right-[3px] z-50 sm:top-[4.7px]'>
              <Button
                size='small'
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Use position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-6 flex items-center gap-5'>
          <input
            type='checkbox'
            className=' h-6 w-6 accent-yellow-400 focus:ring
             focus:ring-yellow-400  focus:ring-offset-2'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <input type='hidden' name='cart' value={JSON.stringify(cart)} />

        <div>
          <Button disabled={isSubmitting || isLoading} size='primary'>
            {isSubmitting ? 'Placing order....' : `Order now ${formatCurrency(totalprice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Incorrect phone number. Try again';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearcartItems());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
