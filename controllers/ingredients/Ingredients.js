const instance = require('../../helpers/instance')

const fetchAll = async (req, res) => {
  const data = await instance.get(`/list.php?i=list`) 
  res.send(data) ;
};


module.exports = fetchAll;
