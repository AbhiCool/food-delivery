import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PizzaCard = ({
  name,
  image,
  price,
  isVeg,
  ingredients,
  recipe,
  spicyLevel,
  category,
  rating,
  _id,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        _id,
        name,
        image,
        price,
      })
    );
  };

  const handleGoToCart = () => {
    navigate("/mycart");
  };

  const isItemInCart = cartItems.some((item) => item._id === _id);
  return (
    <div className="group relative block overflow-hidden">
      {/* <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button> */}

      <img
        src={image}
        alt=""
        className=" w-full object-cover transition duration-500 group-hover:scale-105 "
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {/* <span className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap">
          {" "}
          New{" "}
        </span> */}

        <h3
          className="mt-4 text-lg font-medium text-gray-900 truncate"
          title={name}
        >
          {name}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">₹{price}</p>

        {/* <form className="mt-4"> */}
        {isItemInCart ? (
          <button
            className="inline-flex items-center justify-center gap-2 w-full rounded-sm bg-yellow-800 text-white p-4 text-sm font-medium transition hover:scale-105 cursor-pointer"
            onClick={handleGoToCart}
          >
            <MdShoppingCartCheckout />
            Go to Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 w-full rounded-sm bg-red-600 text-white p-4 text-sm font-medium transition hover:scale-105 cursor-pointer"
          >
            <FaCartPlus />
            Add to Cart
          </button>
        )}
        {/* </form> */}
      </div>
    </div>
  );
};

export default PizzaCard;
