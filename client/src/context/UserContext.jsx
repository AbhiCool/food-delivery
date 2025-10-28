import React, { Children, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext(null);
const UserContext = ({ children }) => {
  const [user, setUser] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [categories, setCategories] = useState([]);

  const [diplayPizzas, setDiplayPizzas] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        searchField,
        setSearchField,
        categories,
        setCategories,
        diplayPizzas,
        setDiplayPizzas,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
