import * as express from "express";
import {loginRequired, validateUser} from "../middleware/auth";
import {Request} from "express";
import {Response} from "express";
import {NextFunction} from "express";
import {statisticService} from "../service";

const router = express.Router();
router.use(loginRequired);
router.use(validateUser);

/**
 * @define 현재 구독 중인 루틴을 조회한다.
 * 이전에 구독했더라도 현재 구독 중이지 않으면 조회하지 않는다.
 */
router.get(
    "/statistic",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(1);
            const { id } = req;
            const statistic = await statisticService
                .generateRandomStatistic(id);
            res.json(statistic);
        } catch (e) {
            next(e);
        }
    }
);

export default router;
