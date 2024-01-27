// https://www.basedash.com/blog/how-to-generate-a-random-bool-in-javascript#using-bitwise-operators

/**
 * Generates a random boolean value.
 *
 * @returns {boolean} A randomly generated boolean value.
 *
 * @remarks
 * https://www.basedash.com/blog/how-to-generate-a-random-bool-in-javascript#using-bitwise-operators
 */
export const getRandomBool = () => !!((Math.random() * 2) | 0);
