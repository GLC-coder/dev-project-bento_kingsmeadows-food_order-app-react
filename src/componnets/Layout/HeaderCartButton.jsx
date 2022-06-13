import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalNumOfItems = cartCtx.cartItems.reduce((curTotalNum, item) => {
    return curTotalNum + item.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.cartItems.length === 0) {
      return;
    }

    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.cartItems]);
  const classes = `${styles.button} ${btnIsHighLighted ? styles.bump : " "}`;

  return (
    <button className={classes} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{totalNumOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
