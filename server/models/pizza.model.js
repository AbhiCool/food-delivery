const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    isVeg: { type: Boolean, required: true, default: true },
    ingredients: [{ type: String, required: true }],
    recipe: { type: String },
    spicyLevel: { type: Number },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pizza", pizzaSchema);
