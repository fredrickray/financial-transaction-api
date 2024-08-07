require("dotenv").config();
const express = require("express");
const { errorHandler, routeNotFound } = require("./middlewares/errorHandler");
const connectDB = require("./config/db");

const port = process.env.PORT || 8229;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is live and running",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routeNotFound);

app.use(errorHandler);
