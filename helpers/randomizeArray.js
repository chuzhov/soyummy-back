const randomizeArray = (arrayLength, numbersCount) => {
  const randNumbArr = [];
  for (let number = 0; number < numbersCount; number++) {
    const randNum = Math.floor(Math.random() * (arrayLength - 1));
    if (randNumbArr.indexOf(randNum) === -1) randNumbArr.push(randNum);
  }
  return randNumbArr;
};

module.exports = { randomizeArray };
