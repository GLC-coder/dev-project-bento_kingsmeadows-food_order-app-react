import React from "react";
import MealsSummary from "./MealsSummary";
import MealsList from "./MealsList";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <MealsList />
    </React.Fragment>
  );
};

export default Meals;
