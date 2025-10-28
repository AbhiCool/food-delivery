import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";

import PizzaCard from "../components/PizzaCard";

import { fetchPizzas } from "../redux/slice/pizzaSlice";

import { useDispatch, useSelector } from "react-redux";
import PizzaLoader from "../components/PizzaLoader";

const Home = () => {
  const { pizzas, loading, error } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();

  const {
    user,

    searchField,
    setCategories,
    diplayPizzas,
    setDiplayPizzas,
    activeCategory,
  } = useContext(UserDataContext);

  console.log("user", user);

  // load all pizzas on load
  useEffect(() => {
    dispatch(fetchPizzas());
  }, []);

  // set categories once all pizzas are loaded
  useEffect(() => {
    setCategories(["All", ...new Set(pizzas.map((pizza) => pizza.category))]);
  }, [pizzas]);

  useEffect(() => {
    console.log("useeffect", pizzas, searchField, activeCategory);
    if (searchField === "" && activeCategory === "All")
      return setDiplayPizzas(pizzas);

    setDiplayPizzas(
      pizzas.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(searchField.toLowerCase()) &&
          (pizza.category === activeCategory || activeCategory === "All")
      )
    );
  }, [pizzas, searchField, activeCategory]);

  if (loading) return <PizzaLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        className="
      mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
      grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {diplayPizzas.map((pizza) => (
          <PizzaCard key={pizza._id} {...pizza} />
        ))}
      </div>
    </>
  );
};

export default Home;
