function CartItem({ id, name, count, price, onAdd, onRemove }) {
  function handleCartRemove() {
    onRemove(id);
  }

  function handleCartAdd() {
    onAdd(id);
  }
  return (
    <li className="cart-item">
      <p>
        {name} - {count} x ${price}
      </p>
      <div className="cart-item-actions">
        <button onClick={handleCartRemove}>-</button>
        <span>{count}</span>
        <button onClick={handleCartAdd}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
