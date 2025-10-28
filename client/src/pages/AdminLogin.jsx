import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const result = true;

    setUser(result);
    navigate("/admin");
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="userid"
          value={formData.userid}
          onChange={handleFieldChange}
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFieldChange}
        />
        <button type="submit">Login</button>
        <Link to="/createAccount">Create Account</Link>
      </form>
    </>
  );
};

export default AdminLogin;
