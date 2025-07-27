const orderModel = require("../models/order.model");

exports.placeOrder = async (req, res, next) => {
  try {
    const data = {
      userid: req.user.id,
      ...req.body,
    };
    console.log(data);
    const order = await orderModel.create(data);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderid: order._id,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find({
        userid: req.user.id,
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
