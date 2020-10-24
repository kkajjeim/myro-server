import * as express from 'express';
import userRouter from './user';
import contentsRouter from './contents';
import routineRouter from './routine';

const router = express.Router();

// 이게 최선인가?
router.use('/', userRouter);
router.use('/', contentsRouter);
router.use('/', routineRouter);

export default router;
