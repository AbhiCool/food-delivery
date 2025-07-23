import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";

const Admin = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [orderData, setOrderData] = useState([
    { Column1: "No Data", Column2: "No Data" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      // call api and wiil receive all order details
    };
    fetchData();
  }, []);
  console.log("user", user);
  if (user) {
    return (
      <>
        <h1>Welcome Admin</h1>
        <table>
          <thead>
            <tr>
              {Object.keys(orderData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr>
                {Object.values(order).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

export default Admin;
