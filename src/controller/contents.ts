import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { query, body, validationResult } from "express-validator";
import { contentsService, routineService } from "../service";
import { validateUser, loginRequired } from "../middleware/auth";

const router = express.Router();
router.use(validateUser);

const contentsValidator = [query("id").isNumeric()];

router.get(
  "/contents",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.id;
      const contents = await contentsService.find();
      if (!id) {
        res.json(contents);
      }
      const userRoutines = await routineService.findByUser(id);
      userRoutines.forEach((routine) => {
        contents.forEach((contents) => {
          routine.contents.id === contents.id && (contents.isSubscribe = true);
        });
      });

      res.json(contents);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/content",
  contentsValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { id } = req.query;
    try {
      const content = await contentsService.findOne(id);
      res.json(content);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
