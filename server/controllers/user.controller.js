const userModel = require("../models/user.model");
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    const { userid, password, address } = req.body;

    const user = await userModel.findOne({ userid });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = new userModel({
      userid,
      password: await brypt.hash(password, 10),
      address,
    });
    await newUser.save();

    delete newUser.password;

    const token = await generateToken(newUser._id);

    console.log("token", token);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userid, password, isAdmin } = req.body;

    const user = await userModel.findOne({ userid });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await brypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (isAdmin !== user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await generateToken(user._id);

    console.log("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
