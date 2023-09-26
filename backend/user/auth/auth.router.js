import express from 'express';
import catchAsyncErrorsMiddleware from '../../middleware/catchAsyncErrors.middleware.js';
import { createUser, } from './auth.controller.js';

const router = express.Router();

router
    .post(`/signup`, catchAsyncErrorsMiddleware(createUser))

export default router;