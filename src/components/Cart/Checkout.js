import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameIsNotValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetIsNotValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: enteredCityIsNotValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: enteredPostalIsNotValid,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput((value) => value.trim().length === 5);

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formValid) return;

    resetCity();
    resetName();
    resetPostal();
    resetStreet();

    props.onClearCart();
    props.onCancel();
  };

  const nameCssClasses = enteredNameIsNotValid
    ? `${classes.control} ${classes.invalid} `
    : `${classes.control}`;
  const streetCssClasses = enteredStreetIsNotValid
    ? `${classes.control} ${classes.invalid} `
    : `${classes.control}`;
  const cityCssClasses = enteredCityIsNotValid
    ? `${classes.control} ${classes.invalid} `
    : `${classes.control}`;
  const postalCssClasses = enteredPostalIsNotValid
    ? `${classes.control} ${classes.invalid} `
    : `${classes.control}`;

  let formValid = false;
  if (
    enteredNameIsValid &&
    enteredPostalIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid
  )
    formValid = true;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameCssClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {enteredNameIsNotValid && (
          <p className={classes["error-text"]}>Name is not valid</p>
        )}
      </div>
      <div className={streetCssClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {enteredStreetIsNotValid && (
          <p className={classes["error-text"]}>Street Name is not valid</p>
        )}
      </div>
      <div className={postalCssClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {enteredPostalIsNotValid && (
          <p className={classes["error-text"]}>Postal Code is not valid</p>
        )}
      </div>
      <div className={cityCssClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {enteredCityIsNotValid && (
          <p className={classes["error-text"]}>City is not valid</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
