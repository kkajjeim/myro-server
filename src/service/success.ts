import {Success} from "../entity/success";
import {LessThanOrEqual, MoreThan} from "typeorm";
import {NotFoundError} from "../common";
import * as dayjs from "dayjs";

// 구독 시 기본 2주치 할당
const DEFAULT_PERIOD = 2;

export const setDefault = async (routine: number,) => {
    let count = 1;
    let startDate = dayjs().startOf('day');

    while(count <= DEFAULT_PERIOD) {
        const success = Success.create({
            routine,
            startDate: startDate.toDate(),
            endDate: startDate.add(6, 'day').endOf('day').toDate(),
        });
        await Success.save(success);

        startDate = startDate.add(7, 'day').startOf('day');
        count ++;
    }
};


export const update = async (routineId: number, day: string) => {
    const now = new Date();
    const success = await Success.findOne({
        where: {
            routine: routineId,
            startDate: LessThanOrEqual(now),
            endDate: MoreThan(now)
        }
    });

    if (!success)
        throw new NotFoundError('no success');

    success[day.toLowerCase()] = true;
    return await success.save();
};
