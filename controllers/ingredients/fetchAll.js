const instance = require('../../helpers/instance')

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const fetchAll = async (req, res) => {
  const { data } = await instance.get(`/list.php?i=list`) 
  if (!data) {
    throw HttpError(500, 'Ingredients not found');
  }
  res.send(data);
};


module.exports = fetchAll;
