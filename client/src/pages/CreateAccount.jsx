import React, { useState } from "react";
import { serverUrls } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GiFullPizza } from "react-icons/gi";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    address: "",
  });
  const register = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    // create cpode for calling API and will return registration sucessful
    try {
      const res = await axios.post(serverUrls.register, formData);
      const data = res.data;

      // Set token in localstorage
      localStorage.setItem("token", data.token);

      toast.sucees(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setFormSubmit(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <GiFullPizza className="mx-auto h-10 w-auto text-red-600" />
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="userid"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.userid}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  name="address"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              {!formSubmit ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer"
                >
                  Register
                </button>
              ) : (
                <p className="text-center text-sm/6 font-medium text-gray-900">
                  Please wait...
                </p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <Link
              to="/"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
