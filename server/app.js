const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const cors = require("cors");
const { google } = require("googleapis");
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/task-management";

//routes
const authRoutes = require("./routes/auth");

const app = express();
config();

app.use(cors()).use(bodyParser.json());

app.use((err, req, res, next) => {
  const message = err.message || "An error occurred";
  const data = err.data || [];
  const status = err.statusCode || 500;
  return res.status(status).json({ message, data });
});

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
