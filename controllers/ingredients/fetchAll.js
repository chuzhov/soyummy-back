const { fetchIngredientsList } = require('../../services');

const fetchAll = async (req, res) => {
  const data = await fetchIngredientsList();
  res.send(data);
};

module.exports = fetchAll;
