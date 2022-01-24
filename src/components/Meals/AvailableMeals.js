import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = (props) => {
  const [mealItems, setMealItems] = useState([]);
  const { sendRequest, isLoading, errorMessage } = useHttp();

  const fetchMealsData = async () => {
    let data = await sendRequest({
      url: "https://react-dea8b-default-rtdb.firebaseio.com/FoodItems.json",
    });
    let DUMMY_MEALS = [];
    for (let item in data) {
      DUMMY_MEALS.push({
        id: item,
        name: data[item].name,
        description: data[item].description,
        price: data[item].price,
      });
    }
    setMealItems(DUMMY_MEALS);
  };

  useEffect(() => {
    fetchMealsData();
  }, []);

  if (isLoading)
    return (
      <section className={styles.loading}>
        <p>Loading</p>
      </section>
    );

  if (errorMessage !== "")
    return (
      <section className={styles.errorLoading}>
        <p>{errorMessage}</p>
      </section>
    );

  const mealsList = mealItems.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    />
  ));

  return (
    <section className={styles["meals"]}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
