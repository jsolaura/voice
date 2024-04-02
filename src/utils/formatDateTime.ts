export const formatTimes = (num: number) => {
    return num < 10 ? `0${num}` : num;
}