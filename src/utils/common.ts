import { v4 as uuid } from "uuid";

export const getGenerateKey = () => {
    return uuid();
}
export const getCount = (count: number) => {
    return `${count}+`
}
export const formatTimes = (num: number) => {
    return num < 10 ? `0${num}` : num;
}

