import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import styles from "./Header.module.css";
import BentoMeals from "../../assets/bento-meals.png";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Bento KingsMeadows</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={BentoMeals} alt="bento delicious meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
