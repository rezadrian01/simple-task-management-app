const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/task-management";

//middleware
const { isAuth } = require("./middleware/auth");

//routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();
config();

app.use(cors()).use(bodyParser.json());

app.use(isAuth);

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.use((err, req, res, next) => {
  const message = err.message || "An error occurred";
  const data = err.data || [];
  const status = err.statusCode || 500;
  return res.status(status).json({ message, data, success: false });
});

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
