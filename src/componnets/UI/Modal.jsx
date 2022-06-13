import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHideCart} />;
};

const Overlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("overlays")
      )}
    </React.Fragment>
  );
};

export default Modal;
