import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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

  const { user, setUser } = useContext(UserDataContext);

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

  if (user) {
    return (
      <>
        <h1>Welcome {user.userid}</h1>
        <h2>Your Order will be Delivered to {user.address}</h2>
        <h3>Order ID: {user.orderid}</h3>
        <form onSubmit={finalOrder}>
          <input
            type="number"
            name="cheeseandcorn"
            min="0"
            value={formData.cheeseandcorn}
            onChange={handleFieldChange}
          />
          <input
            type="number"
            name="capsicum"
            min="0"
            value={formData.capsicum}
            onChange={handleFieldChange}
          />

          <input
            type="number"
            name="margherita"
            min="0"
            value={formData.margherita}
            onChange={handleFieldChange}
          />
          <input
            type="number"
            name="onion"
            min="0"
            value={formData.onion}
            onChange={handleFieldChange}
          />
          <button type="submit">Add Pizza</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <h1>You are not Logged In</h1>
      </>
    );
  }
};

export default Home;
