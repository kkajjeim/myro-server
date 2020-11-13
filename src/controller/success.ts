import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { successService } from "../service";
import { authHandler } from "../middleware/auth";

const router = express.Router();
router.use(authHandler);

const successValidator = [
    body('routineId').isNumeric(),
    body('day').isString()
];

router.post(
    "/success", successValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const { routineId, day } = req.body;
            const success = await successService.update(routineId, day);
            res.json(success);
        } catch (e) {
            next(e);
        }
    }
);

export default router;
