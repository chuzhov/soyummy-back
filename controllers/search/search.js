const ctrl = require('../ctrlWrapper');
const instance = require('../../helpers/instance');
const { HttpError } = require('../../routes/errors/HttpErrors');

const search = async (req, res, next) => {
  const {
    data: { meals },
  } = await instance.get(`search.php?s=${req.params.keyWord}`);
  if (!meals) throw HttpError(400);
  res.json({ meals });
};

module.exports = { search: ctrl(search) };
