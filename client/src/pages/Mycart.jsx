import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrls } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cartActions } from "../redux/slice/cartSlice";
import Header from "../components/Header";

const Mycart = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const shipping = 40;
  let total = 0;
  let grandTotal = 0;

  // Calculate total amount from cart items
  total = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  grandTotal = total + shipping;

  const handleRemoveFromCart = (id) => {
    console.log("id", id);
    const confirm = window.confirm("Are you sure to want remove this item?");
    if (confirm) {
      dispatch(cartActions.removeFromCart(id));
    }
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(cartActions.increaseItemQty(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(cartActions.decreaseItemQty(id));
  };

  const handleGoToHome = () => {
    navigate("/");
  };
  const placeOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    console.log("token", token);
    if (!token) {
      toast.error("Please login first to place order");
      navigate("/");
      return;
    }

    try {
      const orderData = {
        cartItems,
        total,
        shipping,
        grandTotal,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(serverUrls.placeOrder, orderData, config);
      const data = res.data;
      toast.success(data.message);

      dispatch(cartActions.clearCart());

      const finaldata = {
        userid: user.userid,
        address: user.address,
        orderid: data.orderid,
      };

      setUser(finaldata);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {!cartItems.length ? (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-[50px]">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                No items in your cart. Start adding delicious pizzas!
              </h1>
            </header>
            <button
              className="inline-flex items-center justify-center gap-2 w-full rounded-sm bg-red-600 text-white p-4 text-sm font-medium transition hover:scale-105 cursor-pointer mt-4"
              onClick={handleGoToHome}
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center gap-4 border-b-gray-300 border-b py-2"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="size-16 rounded-sm object-cover"
                      />

                      <div>
                        <h3 className="text-md text-gray-900 font-semibold">
                          {item.name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline ml-[3px] font-bold text-xs text-gray-500">
                              ₹{item.price}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <div className="flex items-center gap-1">
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>
                          <button
                            type="button"
                            className=" leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer"
                            onClick={() => handleDecreaseQuantity(item._id)}
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            id="Line1Qty"
                            className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            readOnly
                          />
                          <button
                            type="button"
                            className="leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer"
                            onClick={() => handleIncreaseQuantity(item._id)}
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          className="text-gray-600 transition hover:text-red-600 cursor-pointer"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>₹{total}</dd>
                      </div>

                      {/* <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>₹25</dd>
                    </div> */}

                      {/* <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-₹20</dd>
                    </div> */}
                      <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd>₹{shipping}</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>₹{grandTotal}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <button
                        href="#"
                        className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 cursor-pointer"
                        onClick={placeOrder}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Mycart;
