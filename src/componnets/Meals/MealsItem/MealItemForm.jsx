import React, { useRef } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemFrom.module.css";

const MealItemFrom = (props) => {
  const amountInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    props.addAmount(enteredAmountNum);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemFrom;
