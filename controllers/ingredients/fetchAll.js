const { fetchIngredientsList } = require('../../helpers');

const fetchAll = async (req, res) => {
  const data = await fetchIngredientsList();
  res.send(data);
};

module.exports = fetchAll;
