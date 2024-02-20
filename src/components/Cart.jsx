import CartItem from "./CartItem";

function Cart({ onClose, carts, onAdd, onRemove, onChangeModal, totalPrice }) {
  function handleOpenCheckout() {
    onChangeModal("CHECKOUT");
  }
  return (
    <section className="cart">
      <h2>Your Cart</h2>
      <ul>
        {carts.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              name={cartItem.name}
              count={cartItem.count}
              price={cartItem.price}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
      <div className="cart-total">${totalPrice}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={handleOpenCheckout}>
          Go to Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;
