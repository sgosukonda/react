import { useState } from "react";

const useInput = (validateFunction) => {
  const [valueEntered, setValueEntered] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueEnteredIsValid = validateFunction(valueEntered);
  const valueEnteredIsNotValid = isTouched && !valueEnteredIsValid;

  const valueChangeHandler = (event) => {
    setValueEntered(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValueEntered("");
    setIsTouched(false);
  };

  return {
    value: valueEntered,
    isValid: valueEnteredIsValid,
    hasError: valueEnteredIsNotValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
