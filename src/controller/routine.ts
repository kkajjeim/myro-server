import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { routineService } from "../service";
import { authHandler } from "../middleware/auth";

const router = express.Router();
router.use(authHandler);

const routineValidator = [
  body('contents').isNumeric(),
  body('mon').isBoolean(),
  body('tue').isBoolean(),
  body('wed').isBoolean(),
  body('thu').isBoolean(),
  body('fri').isBoolean(),
  body('sat').isBoolean(),
  body('sun').isBoolean(),
  body('alarmTime').isString(),
];

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

router.post(
  "/routine", routineValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json(errors.array());
      }
      const {id} = req
      const content = await routineService.enroll(id, req.body);
      res.json(content);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
