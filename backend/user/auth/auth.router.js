import express from 'express';
import catchAsyncErrorsMiddleware from '../../middleware/catchAsyncErrors.middleware.js';
import { createUser, google, login, } from './auth.controller.js';

const router = express.Router();

router
    .post(`/signup`, catchAsyncErrorsMiddleware(createUser))
    .post('/login', catchAsyncErrorsMiddleware(login))
    .post('/google', catchAsyncErrorsMiddleware(google))

export default router;