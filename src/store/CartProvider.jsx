import React, { useReducer } from "react";

import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalPrice =
        state.totalPrice + action.item.price * action.item.amount;
      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.item.id
      );

      let updatedCartItems;
      if (existingCartItem) {
        let existingCartItemIndex = state.cartItems.indexOf(existingCartItem);
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      } else {
        updatedCartItems = state.cartItems.concat(action.item);
      }
      return {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case "REMOVE": {
      let updatedCartItems;
      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.id
      );

      const updatedTotalPrice = state.totalPrice - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedCartItems = state.cartItems.filter(
          (item) => item.id !== action.id
        );
      } else {
        let existingCartItemIndex = state.cartItems.indexOf(existingCartItem);
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      }
      return {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case "CLEAR":
      return initialCartState;

    default:
      return initialCartState;
  }
};

const initialCartState = {
  cartItems: [],
  totalPrice: 0,
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const addItemHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    cartDispatch({ type: "REMOVE", id: id });
  };

  const clearItemHandler = () => {
    cartDispatch({ type: "CLEAR" });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalPrice: cartState.totalPrice,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
