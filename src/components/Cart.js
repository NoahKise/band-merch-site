import React from "react";

function Cart({ cartItems, removeFromCart }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.imgSrc} alt={item.name} />
            {item.name} - {item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;