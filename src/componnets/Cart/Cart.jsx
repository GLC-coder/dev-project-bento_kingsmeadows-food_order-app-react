import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { ORDER_DATA_LINK } from "../../constant";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.cartItems.length > 0;
  const cartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const onConfirmOderHandler = async (useData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(ORDER_DATA_LINK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: useData,
          order: {
            orderItem: cartCtx.cartItems,
            orderTotalPrice: cartCtx.totalPrice,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      cartCtx.clearItem()
    } catch (error) {
      setError(error.message);
    }
  };

  const cartItemList = (
    <ul className={styles["cart-items"]}>
      {cartCtx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartAddHandler.bind(null, item)}
          onRemove={cartRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartActionBtns = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModal = (
    <React.Fragment>
      {" "}
      {cartItemList}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={onConfirmOderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isCheckout && cartActionBtns}
    </React.Fragment>
  );

  const isSubmmittingMessage = <p>Sending order data...</p>;
  const isSubmittedMessage = (
    <React.Fragment>
      <p>
        Successfully submmited! We will let you know when prepared your order,
        Thank you choosing Bneto Box!
      </p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  const errorMessage = (
    <React.Fragment>
      <p>{error}</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {isSubmitting && isSubmmittingMessage}
      {isSubmitted && isSubmittedMessage}
      {error && errorMessage}
      {!isSubmitting && !isSubmitted && !error && cartModal}
    </Modal>
  );
};

export default Cart;
