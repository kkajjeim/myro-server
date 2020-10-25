import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { query, body, validationResult } from "express-validator";
import { contentsService } from "../service";

const router = express.Router();
const contentsValidator = [
  query('id').isNumeric(),
];

router.get(
  "/contents",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contents = await contentsService.find();
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
