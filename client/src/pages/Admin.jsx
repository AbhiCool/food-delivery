import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { serverUrls } from "../constants";
import axios from "axios";

const Admin = () => {
  const { user } = useContext(UserDataContext);
  const [orderData, setOrderData] = useState([
    { Column1: "No Data", Column2: "No Data" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");

      // call api and wiil receive all order details
      const res = await axios.get(serverUrls.getOrders);
      const data = res.data;
      setOrderData(data.orders);
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
            {orderData.map((order, i) => (
              <tr key={i}>
                {Object.values(order).map((value, j) => (
                  <td key={j}>{value}</td>
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
