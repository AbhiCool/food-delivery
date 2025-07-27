"use client";

import { IoMdLogOut } from "react-icons/io";
import { Fragment, useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiFullPizza } from "react-icons/gi";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { cartActions } from "../redux/slice/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const {
    searchField,
    setSearchField,
    categories,
    setCategories,
    setActiveCategory,
  } = useContext(UserDataContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully");
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {categories.map((category) => (
                <div key={category} className="flow-root">
                  <div
                    onClick={() => {
                      console.log("category", category);
                      setActiveCategory(category);
                    }}
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  >
                    {category}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {localStorage.getItem("token") ? (
                <>
                  <div className="flow-root">
                    <Link
                      to="/myorders"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Order History
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flow-root">
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <a
                      href="/createAccount"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </>
              )}
            </div>
            {/* 
            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden cursor-pointer"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <GiFullPizza className="mx-auto h-8 w-auto text-red-600" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => {
                        console.log("category", category);
                        setActiveCategory(category);
                      }}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {localStorage.getItem("token") ? (
                    <>
                      <Link
                        to="/myorders"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Order History
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <Link
                        to="/createAccount"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="size-6 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search pizzas..."
                    className="outline-none border-b-1 border-b-gray-300"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to="/mycart"
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className=" text-sm font-medium text-white group-hover:text-gray-800 bg-red-500 p-[5px] rounded-full h-[20px] w-[20px] flex items-center justify-center">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>

                {localStorage.getItem("token") && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <IoMdLogOut
                      onClick={handleLogout}
                      title="Logout"
                      className="cursor-pointer text-2xl text-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
