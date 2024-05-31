import { useEffect, useState } from "react";
import Meal from "./Meal";
import { fetchMeals } from "../http";
import Error from "./Error";

export default function Meals() {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setErro] = useState();

  useEffect(() => {
    async function fetchGoodMeals() {
      try {
        const meals = await fetchMeals();
        setAvailableMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setErro({
          message:
            error.message || " Could not fetch places, Please try again later",
        });
        setIsFetching(false);
      }
    }
    fetchGoodMeals();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }
  return (
    <Meal
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meals data"
      fallbackText="No meals available"
    />
  );
}
