import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={styles["backdrop"]} onClick={props.onClose}>{props.children}</div>;  
}

const ModalOverlay = (props) => {
  return <div className={styles["modal"]}>
      <div className={styles["content"]}>{props.children}</div>
      </div>;
};

const Modal = props => {
    const backdrop = document.getElementById("rootBackdrop");
    const modal = document.getElementById("rootModal");

    return <React.Fragment>
        { ReactDom.createPortal(<Backdrop onClose={props.onClose} />, backdrop) }
        { ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, modal)}
    </React.Fragment>
}
export default Modal;
