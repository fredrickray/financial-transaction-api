import "dotenv/config";
import express from "express";
import { errorHandler, routeNotFound } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 8229;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
