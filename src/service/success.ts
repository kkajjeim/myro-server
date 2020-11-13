import {Success} from "../entity/success";
import {LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import {NotFoundError} from "../common";


export const update = async (routineId: number, day: string) => {
    const now = new Date();
    const success = await Success.findOne({
        where: {
            routineId,
            startDate: LessThanOrEqual(now),
            endDate: MoreThanOrEqual(now)
        }
    });

    if (!success)
        throw new NotFoundError('no success');

    success[day.toLowerCase()] = true;
    return await success.save();
};
