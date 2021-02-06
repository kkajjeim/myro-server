import {Weekday} from "./enum";

export const randomIntFromInterval = (
    min: number,
    max: number
): number => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateDays = (
    sun: boolean, mon: boolean, tue: boolean, wed: boolean, thu:boolean, fri:boolean, sat:boolean
): number[] => {
    const result = [];

    result[Weekday.SUN] = Number(sun);
    result[Weekday.MON] = Number(mon);
    result[Weekday.TUE] = Number(tue);
    result[Weekday.WED] = Number(wed);
    result[Weekday.THU] = Number(thu);
    result[Weekday.FRI] = Number(fri);
    result[Weekday.SAT] = Number(sat);

    return result;
};
