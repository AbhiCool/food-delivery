import React, { useEffect } from "react";
import { LuClipboardList } from "react-icons/lu";

import { fetchOrders } from "../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaShippingFast } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
  if (error) return <h1 className="text-center text-red-500">{error}</h1>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <LuClipboardList className="inline mr-[3px]" />
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map(
          ({ id, createdAt, total, shipping, grandTotal, cartItems }) => (
            <div
              key={id}
              className="border border-gray-300 rounded-lg shadow-sm p-6 mb-6 bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">
                <p className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="inline mr-[3px]" />
                  Order placed on{" "}
                  <span className="font-medium">
                    {new Date(createdAt).toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border border-gray-300 p-3 rounded-lg"
                    >
                      <img
                        className="w-24 h-24 object-cover rounded"
                        src={item.image}
                        alt={item.name}
                      />
                      <div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm text-gray-700">
                          {item.quantity} x ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">
                      <GiMoneyStack className="inline mr-[3px]" />
                      Total:
                    </span>{" "}
                    ₹{total}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">
                      <FaShippingFast className="inline mr-[3px]" /> Shipping:
                    </span>
                    <span>₹{shipping}</span>
                  </p>
                  <p className="text-lg font-bold flex items-center gap-1">
                    <TbMoneybag className="inline" />
                    Grand Total:
                    <span>₹{grandTotal}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default MyOrders;
