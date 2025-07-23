import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const result = {
      userid: "hari@gmail.com",
      address: "Mumbai",
      orderid: "No order yet",
    };

    setUser(result);
    navigate("/home");
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
      </form>
      <Link to="/createAccount">Create Account</Link>
      <br />
      <Link to="/adminlogin">Admin Login</Link>
    </>
  );
};

export default Login;
