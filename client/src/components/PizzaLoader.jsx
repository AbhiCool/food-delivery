import React from "react";
import { FaPizzaSlice } from "react-icons/fa";

const PizzaLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin text-red-500 text-[100px]">
        <FaPizzaSlice />
      </div>
    </div>
  );
};

export default PizzaLoader;
