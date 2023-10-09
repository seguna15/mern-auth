import express from "express";
import ErrorHandler from "./middleware/error.middleware.js";
const app = express();
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
//app.use("/", express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

//import routes
import authRoute from "./user/auth/auth.router.js";
import userRoute from "./user/user.router.js";

const APP_ROUTE = process.env.API_URL;

app.use(`${APP_ROUTE}/auth`, authRoute);
app.use(`${APP_ROUTE}/user`, userRoute);

//For ErrorHandling
app.use(ErrorHandler);
export default  app;
