import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateCart({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className=' flex items-center justify-center gap-2'>
      <Button size='small' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
        -
      </Button>
      <span className=' font-medium'>{currentQuantity}</span>

      <Button size='small' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateCart;
