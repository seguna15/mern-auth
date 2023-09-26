import express from "express";
import ErrorHandler from "./middleware/error.middleware.js";
const app = express();
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import authRoute from './user/auth/auth.router.js';
//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
//app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

//import routes
const APP_ROUTE = process.env.API_URL;

app.use(`${APP_ROUTE}/auth`, authRoute);

//For ErrorHandling
app.use(ErrorHandler);
export default  app;
