/*
 * Generates random index
 * Accepts array and number upperBound
 */
const generateRandomIndex = (arr = [], upperBound = 0) => {
  const randomIndex = Math.floor(Math.random() * arr.length + upperBound);
  return randomIndex;
};

module.exports = generateRandomIndex;
