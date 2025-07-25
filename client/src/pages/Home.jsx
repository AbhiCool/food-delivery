import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrls } from "../constants";
import PizzaCard from "../components/PizzaCard";
import Header from "../components/Header";
import { fetchPizzas } from "../redux/slice/pizzaSlice";

import { useDispatch, useSelector } from "react-redux";
import PizzaLoader from "../components/PizzaLoader";
const Home = () => {
  const navigate = useNavigate();
  const { pizzas, loading, error } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cheeseandcorn: 0,
    capsicum: 0,
    margherita: 0,
    onion: 0,
  });
  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    0;
  };

  const {
    user,
    setUser,
    searchField,
    setCategories,
    diplayPizzas,
    setDiplayPizzas,
    activeCategory,
    setActiveCategory,
  } = useContext(UserDataContext);

  console.log("user", user);

  const finalOrder = (e) => {
    e.preventDefault();
    console.log(formData);
    const sentData = {
      ...user,
      ...formData,
      totalamount:
        formData.cheeseandcorn * 110 +
        formData.capsicum * 90 +
        formData.margherita * 130 +
        formData.onion * 105,
    };

    setUser(sentData);
    navigate("/mycart");
  };

  useEffect(() => {
    dispatch(fetchPizzas());
  }, []);

  useEffect(() => {
    setCategories(["All", ...new Set(pizzas.map((pizza) => pizza.category))]);
  }, [pizzas]);

  useEffect(() => {
    console.log("useeffect", pizzas, searchField, activeCategory);
    if (searchField === "" && activeCategory === "All")
      return setDiplayPizzas(pizzas);

    console.log("hhh");
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
