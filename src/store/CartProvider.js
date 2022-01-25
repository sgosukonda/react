import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
    if(action.type === "ADD"){
        let updatedCartItems = [];
        const updatedtotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        const itemExistsIndex = state.items.findIndex(item=> item.id === action.item.id);
        if(itemExistsIndex > -1){
            const existingItem = state.items[itemExistsIndex];
            const updtedItem = {...existingItem, amount: existingItem.amount + action.item.amount}
            updatedCartItems = [...state.items];
            updatedCartItems[itemExistsIndex] = updtedItem;
        }
        else
            updatedCartItems = state.items.concat(action.item);

        return {
            items: updatedCartItems,
            totalAmount: updatedtotalAmount
        }
    }
    else if(action.type === "REMOVE"){
        const itemExistsIndex = state.items.findIndex(item=> item.id === action.id);
        const existingItem = state.items[itemExistsIndex];
        const updatedtotalAmount = state.totalAmount - existingItem.price;
        let updatedCartItems = [];
        if(existingItem.amount === 1){
            updatedCartItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedCartItems = [...state.items];
            updatedCartItems[itemExistsIndex] = updatedItem;
        }

        return {
            items: updatedCartItems,
            totalAmount: updatedtotalAmount
        }
    }
    else if(action.type === "CLEAR") {
      return defaultCartState;
    }
  return defaultCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultCartState);

  const onAddCartItemHandler = (item) => {
      dispatchCardAction({type: 'ADD', item: item});
  };

  const onRemoveCartItemHandler = (id) => {
      dispatchCardAction({type: "REMOVE", id: id})
  };

  const onClearCartHandler = () => {
    dispatchCardAction({type: "CLEAR"});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: onAddCartItemHandler,
    removeItem: onRemoveCartItemHandler,
    clearCart: onClearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
