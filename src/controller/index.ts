import * as express from 'express';
import userRouter from './user';
import contentsRouter from './contents';
import routineRouter from './routine';
import successRouter from './success';
import statisticRouter from './statistic';

const router = express.Router();
router.use('/', userRouter);
router.use('/', contentsRouter);
router.use('/', routineRouter);
router.use('/', successRouter);
router.use('/', statisticRouter);

export default router;
