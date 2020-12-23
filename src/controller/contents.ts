import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { query, body, validationResult } from "express-validator";
import { contentsService, routineService } from "../service";
import { validateUser } from "../middleware/auth";

const router = express.Router();


const contentsValidator = [query("id").isNumeric()];

router.get(
  "/contents",
  validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('/contents')
    try {
      const id = req.id;
      const contents = await contentsService.find(id);
      return res.json(contents);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/content",
  validateUser,
  contentsValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { id } = req.query;
    const userId = req.id;

    try {
      const content = await contentsService.findOne(id, userId);
      console.log("#########", content)
      res.json(content);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
