import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isValid = (value) => value.trim().length !== 0;
const isFourChar = (value) => value.trim().length === 4;


const Checkout = (props) => {
  const [inputFormValidity, setInputFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
 
  const onConfirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = isValid(enteredName);
    
    const enteredStreetIsValid = isValid(enteredStreet);
    const enteredCityIsValid = isValid(enteredCity);
    const enteredPostalCodeIsValid = isFourChar(enteredPostalCode);

    setInputFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name:enteredName,
        street: enteredStreet,
        postalCode : enteredPostalCode,
        city : enteredCity,
    })
  };

  const nameControlClasses = `${styles.control} ${
    inputFormValidity.name ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    inputFormValidity.street ? "" : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    inputFormValidity.postalCode ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    inputFormValidity.city ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={onConfirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!inputFormValidity.name && <p>Name is invalid!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street (No./Unit)</label>
        <input type="text" id="street" ref={streetRef} />
        {!inputFormValidity.street && <p>Street is invalid!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!inputFormValidity.postalCode && (
          <p>PostalCode is invalid(shoud be 4 character)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="City" ref={cityRef} />
        {!inputFormValidity.city && <p>City is invalid!</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Confrim</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
