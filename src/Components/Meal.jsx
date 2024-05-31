// import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meal() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  console.log(loadedMeals);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if(error) {
   return <Error title='Failed to fetch meals' message={error} />

  }
  // if(!data){
  //   return <p>No meals found...</p>
  // }
  //  const [loadedMeals, setLoadedMeals] = useState([]);

  //  useEffect(() => {
  //    async function fetchMeals() {
  //    const response = await fetch('http://localhost:3000/meals');

  //    if(!response.ok) {

  //    }
  //    const meals = await response.json();
  //    setLoadedMeals(meals);
  //    }

  //    fetchMeals();

  //  }, []);

  return (
    <section>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
