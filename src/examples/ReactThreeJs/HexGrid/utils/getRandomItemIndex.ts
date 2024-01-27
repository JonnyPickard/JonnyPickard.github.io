/**
 * Returns the index of a randomly selected item from the given array.
 *
 * @typeparam T - The type of items in the array.
 *
 * @param {T[]} items - An array of items from which to select a random index.
 *
 * @returns {number} The index of the randomly selected item.
 *
 * @throws {Error} Will throw an error if the input array is empty.
 *
 */
export const getRandomItemIndex = <T>(items: T[]): number =>
  Math.floor(Math.random() * items.length);
