import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mycart from "./pages/Mycart";
import CreateAccount from "./pages/CreateAccount";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import MyOrders from "./pages/MyOrders";
const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mycart" element={<Mycart />}></Route>
          <Route path="/createAccount" element={<CreateAccount />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
          <Route
            path="*"
            element={<h1>Sorry, the page does not exist</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
