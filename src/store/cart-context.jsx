import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: (id) => {},
});

export default CartContext;
