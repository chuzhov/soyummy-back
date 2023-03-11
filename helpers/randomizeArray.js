const { randNum } = require('./randNum');

const randomizeArray = (arrayLength, numbersCount) => {
  const uniqArray = new Set();
  for (let number = 0; number < numbersCount; number++) {
    uniqArray.add(randNum(arrayLength - 1));
  }
  return [...uniqArray];
};

module.exports = { randomizeArray };
