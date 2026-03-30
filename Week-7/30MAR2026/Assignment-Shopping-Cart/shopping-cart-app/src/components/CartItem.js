import React from "react";

function CartItem({ item, removeFromCart, updateQty }) {
  return (
    <div className="cart-item">
      <span>
        {item.name} x{item.qty} = ${item.price * item.qty}
      </span>

      <div>
        <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;