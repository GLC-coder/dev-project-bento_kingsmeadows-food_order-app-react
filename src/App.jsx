import React, { useState } from "react";
import Header from "./componnets/Layout/Header";
import Meals from "./componnets/Meals/Meals";
import Cart from "./componnets/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCartHandler = () => {
    setCartVisible(false);
  };
  return (
    <CartProvider>
      {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
