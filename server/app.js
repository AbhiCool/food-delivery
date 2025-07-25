const { config } = require("dotenv");
config();
const cors = require("cors");
const express = require("express");

const connectDb = require("./config/db");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route.js");
const pizzaRoute = require("./routes/pizza.routes");
const app = express();
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/pizza", pizzaRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
