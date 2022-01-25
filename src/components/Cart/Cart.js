import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const [showOrder, setShowOrder] = useState(false);

  const cartItemAddHandler = (item) => {
    const newItem = { ...item, amount: 1 };
    cartContext.addItem(newItem);
  };

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const clearCartHandler = (id) => {
    cartContext.clearCart();
  };

  const orderClickHandler = () => {
    setShowOrder(true);
  };

  const CartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  
  const orderButtons = (
    <div className={styles["actions"]}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={styles["button"]} onClick={orderClickHandler}>
            Order
          </button>
        )}
      </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {CartItems}
      <div className={styles["total"]}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showOrder && <Checkout onCancel={props.onClose} onClearCart={clearCartHandler} />}
      {!showOrder && orderButtons}
    </Modal>
  );
};

export default Cart;
