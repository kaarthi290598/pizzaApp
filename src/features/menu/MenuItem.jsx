import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCart, getCurrentQuantity } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateCart from '../cart/UpdateCart';

function MenuItem({ pizza }) {
  const { id: pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  const isPresentCart = cart.some((item) => item.pizzaId === pizzaId);

  function handleClick() {
    const item = {
      pizzaId,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    console.log(item);
    dispatch(addItem(item));
  }

  return (
    <li className='flex gap-4 py-3'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-36 rounded-md sm:h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex grow flex-col'>
        <p className=' font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex  flex-col items-start justify-between gap-3 sm:flex-row sm:items-center'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>Sold out</p>
          )}
          {isPresentCart && !soldOut && (
            <div className='flex   gap-4'>
              <UpdateCart pizzaId={pizzaId} currentQuantity={currentQuantity} />
              <DeleteItem id={pizzaId} />
            </div>
          )}
          {!soldOut && !isPresentCart && (
            <Button size='small' onClick={() => handleClick()}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
