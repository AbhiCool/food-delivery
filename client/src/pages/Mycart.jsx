import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const placeOrder = (e) => {
    e.preventDefault();

    const res = {
      userid: user.userid,
      address: user.address,
      orderid: "256466355",
    };
    setUser(res);
    navigate("/home");
  };
  console.log("user", user);
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>UserId</td>
            <td>{user.userid}</td>
          </tr>
          <tr>
            <td>Cheese and Corn</td>
            <td>{user.cheeseandcorn}</td>
          </tr>
          <tr>
            <td>Capsicum</td>
            <td>{user.capsicum}</td>
          </tr>
          <tr>
            <td>Margherita</td>
            <td>{user.margherita}</td>
          </tr>
          <tr>
            <td>Onion</td>
            <td>{user.onion}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{user.address}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>{user.totalamount}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={placeOrder}>Place Order</button>
    </>
  );
};

export default Mycart;
