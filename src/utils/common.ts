import { v4 as uuid } from "uuid";

export const getGenerateKey = () => {
    return uuid();
}
export const getCount = (count: number) => {
    return `${count}+`
}
export const formatTimes = (num: number, isMinutes?: boolean) => {
    return num < 10 ? `${!isMinutes ? '0': ''}${num}` : num;
}

export const durationFormat = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `0${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}
export const setupAddress= (result: string[], status: string) => {
    if (status === 'OK') {
        return result.slice(0, 3).join(' ');
    } else return '';
}