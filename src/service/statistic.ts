import {Contents, Routine} from "../entity";
import {randomIntFromInterval} from "../common/util";

const HISTORY_TITLE = '구독했던 습관';
const DAILY_TITLE_SUFFIX = '에 어울리는 습관';
const WEEKLY_TITLE_SUFFIX = '요일에 인기있는 습관';
const CONTENTS_PER_THEME = 3;

const DAILY = [
    {type: "아침", from: 5, to: 11},
    {type: "출근 시간", from: 8, to: 10},
    {type: "점심 시간", from: 12, to: 13},
    {type: "퇴근 길", from: 17, to: 19},
    {type: "저녁", from: 19, to: 24}];

const WEEKLY = [
    {type: "월", day: "mon"},
    {type: "화", day: "tue"},
    {type: "수", day: "wed"},
    {type: "목", day: "thu"},
    {type: "금", day: "fri"},
    {type: "토", day: "sat"},
    {type: "일", day: "sun"}];


export const generateRandomStatistic = async (userid): Promise<Statistic[]> => {
    const result = [];

    result.push(await getHistory(userid));
    result.push(await getDailyRecommendation());
    result.push(await getWeeklyRecommendation());

    return result;
};

const getHistory = async (userid): Promise<Statistic> => {
    const result = new Statistic(HISTORY_TITLE);
    const history = await Routine.find({user: userid});

    const included = [];
    history.forEach(r => {
        const isDuplicatedContent = included.includes(r.contents.id);
        if (!isDuplicatedContent) {
            result.contents.push(r.contents);
            included.push(r.contents.id);
        }
    });

    return result;
};

const generateAlarmTimes = (from: number, to: number): string[] => {
    const result = [];
    for (let i = from; i <= to; i++) {
        result.push(`${i}:00`);
    }
    return result;
};


const getDailyRecommendation = async (): Promise<Statistic> => {
    const index = randomIntFromInterval(1, DAILY.length) - 1;
    const targetHours = DAILY[index];

    const title = targetHours.type + DAILY_TITLE_SUFFIX;
    const result = new Statistic(title);

    const filter = generateAlarmTimes(targetHours.from, targetHours.to)
        .map(t => {return {recommendTime: t}});

    const contents = await Contents.find({where: filter});
    result.contents = contents.slice(0, CONTENTS_PER_THEME);

    return result;
};

const getWeeklyRecommendation = async (): Promise<Statistic> => {
    const index = randomIntFromInterval(1, WEEKLY.length) - 1;
    const targetDay = WEEKLY[index];

    const title = targetDay.type + WEEKLY_TITLE_SUFFIX;
    const result = new Statistic(title);

    const filter = {};
    filter[targetDay.day] = true;

    const contents = await Contents.find({where: filter});
    result.contents = contents.slice(0, CONTENTS_PER_THEME);

    return result;
};

class Statistic {
    title: string;
    contents: Contents[];

    constructor(title) {
        this.title = title;
        this.contents = [];
    }
}
