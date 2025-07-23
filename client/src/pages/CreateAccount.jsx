import React, { useState } from "react";

const CreateAccount = () => {
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    address: "",
  });
  const register = (e) => {
    e.preventDefault();

    // create cpode for calling API and will return registration sucessful
    setData("registration successful");
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={register}>
        <input
          type="text"
          name="userid"
          placeholder="userid"
          value={formData.userid}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
      </form>
      <h2>{data}</h2>
    </>
  );
};

export default CreateAccount;
