import express from 'express';
import catchAsyncErrorsMiddleware from '../../middleware/catchAsyncErrors.middleware.js';
import { createUser, forgotPassword, google, login, logout, refreshToken, resetPassword } from "./auth.controller.js";

const router = express.Router();

router
    .post(`/signup`, catchAsyncErrorsMiddleware(createUser))
    .post('/login', catchAsyncErrorsMiddleware(login))
    .post('/google', catchAsyncErrorsMiddleware(google))
    .post('/logout', catchAsyncErrorsMiddleware(logout))
    .post('/refresh', catchAsyncErrorsMiddleware(refreshToken))
    .post('/forgot-password', catchAsyncErrorsMiddleware(forgotPassword))
    .post('/reset-password', catchAsyncErrorsMiddleware(resetPassword))

export default router;