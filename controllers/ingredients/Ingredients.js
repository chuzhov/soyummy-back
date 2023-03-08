const axios = require('axios');

const BASE_URL = 'https://themealdb.com/api/json/v1/1'

// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

const fetchAll = async (req, res) => {
  await axios.get(`${BASE_URL}/list.php?i=list`) 
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500); 
    });
};


module.exports = fetchAll;
