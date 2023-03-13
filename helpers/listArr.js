const { HttpError } = require('../routes/errors/HttpErrors');

const getListArr = (updated, reqArr) => {
  if (!updated) {
    for (const ingridient of reqArr) {
      if (isNaN(parseFloat(ingridient.number))) {
        throw HttpError(400, 'Bad number');
      }
    }
    return;
  }

  const { listArr } = updated;

  const listArrNames = listArr.map(el => el.ingridientName);

  for (const ingridient of reqArr) {
    const index = listArrNames.indexOf(ingridient.ingridientName);

    if (index === -1) {
      listArr.push(ingridient);
    } else {
      const incomeMeasure =
        ingridient.number != parseFloat(ingridient.number)
          ? ingridient.number.slice(parseFloat(ingridient.number).toString().length)
          : '';
      const measure =
        listArr[index].number != parseFloat(listArr[index].number)
          ? listArr[index].number.slice(parseFloat(listArr[index].number).toString().length)
          : '';

      if (
        isNaN(parseFloat(ingridient.number)) ||
        (incomeMeasure !== measure &&
          !(incomeMeasure === 'g' && measure === 'kg') &&
          !(measure === 'g' || incomeMeasure === 'kg'))
      ) {
        throw HttpError(400, 'Bad number');
      }
      console.log(measure, incomeMeasure);

      if (measure === 'kg' && incomeMeasure === 'g') {
        listArr[index].number =
          (parseFloat(listArr[index].number) * 1000 + parseFloat(ingridient.number)) / 1000 + 'kg';
      } else if (measure === 'g' && incomeMeasure === 'kg') {
        listArr[index].number =
          (parseFloat(listArr[index].number) + parseFloat(ingridient.number) * 1000) / 1000 + 'kg';
      } else {
        listArr[index].number = parseInt(listArr[index].number) + parseInt(ingridient.number);

        if (listArr[index].number >= 1000 && measure === 'g') {
          listArr[index].number = listArr[index].number / 1000 + 'kg';
        } else {
          listArr[index].number += measure;
        }
      }
    }
  }
  return listArr;
};

module.exports = { getListArr };
