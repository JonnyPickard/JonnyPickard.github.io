/**
 * getRandomInt - Int from 0...max -1
 *
 * @param {number} max 0...max -1
 * @return {number} random int 0 indexed e.g. max of 5 could give you 0,1,2,3,4
 */
export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
