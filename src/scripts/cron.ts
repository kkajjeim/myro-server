import * as cron from 'node-cron';
import * as dayjs from 'dayjs';
import {Routine, Success} from "../entity";
import {LessThanOrEqual, MoreThan} from "typeorm";


export const initializeCronTasks = () => {

    // 구독 종료되는 루틴 비활성화
    cron.schedule('0 1 * * *', async () => {
        const now = dayjs();
        const yesterday = now.startOf('day');

        const endedSuccesses = await Success.find({
            relations: ["routine"],
            where: {endDate: yesterday.toDate()}
        });

        for(const success of endedSuccesses) {
            const isActiveSuccessExists = await Success.find({
                startDate: LessThanOrEqual(now.toDate()),
                endDate: MoreThan(now.toDate())
            });

            if (isActiveSuccessExists.length)
                continue;

            await Routine.update(success.routine, {isActive: false});
        }
    });
};


