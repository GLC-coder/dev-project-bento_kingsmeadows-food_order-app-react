import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";
import MEALS_DATA_LINK from "../../constant";
import styles from "./MealsList.module.css";

const MealsList = () => {
  const [availableMealsData, setAvailableMealsData] = useState([]);
  const [isLoaing, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealsData = async () => {
      setError(null);
      try {
        const response = await fetch(MEALS_DATA_LINK);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        let mealsData = [];
        for (let key in data) {
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setAvailableMealsData(mealsData);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };
    fetchMealsData();
  }, []);

  const Meal = availableMealsData.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  //Method 2 for render is loading or error condition
  // if(isLoaing) {
  //   return<p className={styles.mealsLoading}>Loading ...</p>
  // }
  // if(error) {
  //   return <p className={styles.mealsLoading}>{error}</p>
  // }
  return (
    <React.Fragment>
      {isLoaing && <p className={styles.mealsLoading}>Loading ...</p>}
      {error && <p className={styles.mealsLoading}>{error}</p>}
      {!isLoaing && !error && (
        <Card className={styles.meals}>
          <ul>{Meal}</ul>
        </Card>
      )}
    </React.Fragment>
  );
};

export default MealsList;
