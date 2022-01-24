import { useState, useRef } from "react";

import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const [isFormValid, setIsFormValid] = useState(true);
  const amountInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim() === "0" || enteredAmountNumber < 1 || enteredAmountNumber > 5)
    {
        setIsFormValid(false);
        return;
    }

    setIsFormValid(true);
    props.onAddItem(enteredAmountNumber);
  };

  return (
    <form className={styles["form"]} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id={`amount${props.id}`}
        type="number"
        min="1"
        max="5"
        step="1"
        defaultValue="1"
      />
      <button>+ Add</button>
      {!isFormValid && <p>Please enter valid value for Amount between 1 to 5 !!</p>}
    </form>
  );
};

export default MealItemForm;
