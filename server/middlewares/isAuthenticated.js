const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers?.authorization?.split(" ")[1] || null;

    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token, please login",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message: "Not authenticated",
    });
  }
};

module.exports = isAuthenticated;
