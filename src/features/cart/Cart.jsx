import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearcartItems, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu '>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className=' mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className='mt-6 space-x-3'>
        <Button to='/order/new ' size='primary'>
          Order pizzas
        </Button>

        <Button size='secondary' onClick={() => dispatch(clearcartItems())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;