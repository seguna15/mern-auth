import express from "express";
import { updateUser } from "./user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import catchAsyncErrorsMiddleware from "../middleware/catchAsyncErrors.middleware.js";


const router = express.Router();

router.put("/update/:id", verifyToken, catchAsyncErrorsMiddleware(updateUser));

export default router;