import express from "express";
import ErrorHandler from "./middleware/error.middleware.js";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
//app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

//import routes


//For ErrorHandling
app.use(ErrorHandler);
export default  app;
