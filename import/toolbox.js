/**
 * A function to get a number between minimum and maximum given values.
 * 
 * @param {number} min - minimum range of random
 * @param {number} max - maximum range of random
 * @returns a integer between minimum and maximum given values
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}