import express from 'express';
import { userRouter } from "./user/user-router";

const router = express.Router();

router.use('/user', userRouter)

export { router }
