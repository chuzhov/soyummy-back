const { fetchIngredientsList } = require('../../helpers');

const { HttpError } = require('../../routes/errors/HttpErrors');

const fetchAll = async (req, res) => {
  const { data } = await fetchIngredientsList();
  if (!data) {
    throw HttpError(500, 'Ingredients not found');
  }
  res.send(data);
};

module.exports = fetchAll;
