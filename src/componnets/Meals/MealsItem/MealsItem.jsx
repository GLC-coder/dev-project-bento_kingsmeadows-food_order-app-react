import React, { useContext } from "react";
import MealItemFrom from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "./MealsItem.module.css";

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  
  const price = `$${props.price.toFixed(2)}`;
  const addAmoutHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <MealItemFrom id={props.id} addAmount={addAmoutHandler} />
    </li>
  );
};
export default MealsItem;
