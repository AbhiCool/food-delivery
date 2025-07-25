const pizzaModel = require("../models/pizza.model");

exports.getPizzas = async (req, res, next) => {
  try {
    const pizzas = await pizzaModel.find({});

    res.status(200).json({
      success: true,
      message: "Pizzas fetched successfully",
      pizzas,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
