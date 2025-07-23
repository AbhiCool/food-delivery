import React, { Children, createContext, useState } from "react";

export const UserDataContext = createContext(null);
const UserContext = ({ children }) => {
  const [user, setUser] = useState(false);
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
