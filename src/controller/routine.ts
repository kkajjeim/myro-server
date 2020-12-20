import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { routineService, successService } from "../service";
import { validateUser, loginRequired  } from "../middleware/auth";

const router = express.Router();
router.use(loginRequired);
router.use(validateUser);

const routineValidator = [
  body("contents").isNumeric(),
  body("mon").isBoolean(),
  body("tue").isBoolean(),
  body("wed").isBoolean(),
  body("thu").isBoolean(),
  body("fri").isBoolean(),
  body("sat").isBoolean(),
  body("sun").isBoolean(),
  body("alarmTime").isString(),
];

/**
 * @define 현재 구독 중인 루틴을 조회한다.
 * 이전에 구독했더라도 현재 구독 중이지 않으면 조회하지 않는다.
 */
router.get(
  "/routines",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req;
      const routines = await routineService.findByUser(id);
      res.json(routines);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @define 루틴을 구독한다.
 * 구독을 하면 success 2주치를 자동 생성한다.
 * 재등록일 경우 find 하여 isActive 를 활성화한다.
 */
router.post(
  "/routine",
  routineValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      // @ts-ignore
      // console.log(req);
      const { id } = req;
      const routine = await routineService.enroll(id, req.body);
      await successService.setDefault(routine.id);

      res.json(routine);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
