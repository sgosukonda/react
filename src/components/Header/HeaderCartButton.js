import React, { useState, useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [isButtonBumped, setIsButtonBumped] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if(items.length === 0)
    return;
    setIsButtonBumped(true);

    const timer = setTimeout(() => {setIsButtonBumped(false);}, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  const btnClasses = `${styles["button"]} ${
    isButtonBumped ? styles["bump"] : ""
  }`;

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={styles["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles["badge"]}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
