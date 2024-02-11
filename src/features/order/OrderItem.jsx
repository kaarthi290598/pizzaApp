import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className='flex items-center justify-between gap-5 py-3'>
        <div>
          <p>
            <span className='font-bold  '>{quantity}&times;</span> {name}
          </p>
          <span className='flex gap-2 text-sm  italic'>{ingredients?.join(', ')}</span>
        </div>

        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
