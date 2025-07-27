import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { serverUrls } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { GiFullPizza } from "react-icons/gi";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    isAdmin: false,
  });
  const [formSubmit, setFormSubmit] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setFormSubmit(true);
    console.log(formData);
    try {
      const res = await axios.post(serverUrls.login, formData);
      const data = res.data;

      const result = {
        ...data.user,
        orderid: "No order yet",
      };

      setUser(result);

      // Set token in localstorage
      localStorage.setItem("token", data.token);

      toast.success(data.message);
      if (data.user.isAdmin) navigate("/admin");
      else navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setFormSubmit(false);
    }
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <GiFullPizza className="mx-auto h-10 w-auto text-red-600" />
          <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  type="email"
                  name="userid"
                  required
                  autocomplete="email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.userid}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.password}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <label htmlFor="Option1" className="inline-flex items-center gap-3">
              <input
                className="size-5 rounded border-gray-300 shadow-sm"
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    isAdmin: e.target.checked,
                  });
                }}
              />{" "}
              <span className=" text-sm/6 font-medium text-gray-700">
                For Admin Login
              </span>
            </label>
            <div>
              {!formSubmit ? (
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer"
                >
                  Sign in
                </button>
              ) : (
                <p className="text-center text-sm/6 font-medium text-gray-900">
                  Please wait...
                </p>
              )}
            </div>
          </form>

          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?
            <Link
              to="/createAccount"
              class="font-semibold text-red-600 hover:text-red-500"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
