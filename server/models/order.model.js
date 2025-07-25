const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cartItems: [
      {
        type: {
          _id: { type: String, required: true },
          name: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
        required: true,
      },
    ],
    address: String,
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
