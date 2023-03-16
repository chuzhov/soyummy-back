const axios = require("axios");

const instance = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1",
});

module.exports = instance;
