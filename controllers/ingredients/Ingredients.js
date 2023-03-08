const instance = require('../../helpers/instance')

const fetchAll = async (req, res) => {
  await instance.get(`/list.php?i=list`) 
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500); 
    });
};


module.exports = fetchAll;
