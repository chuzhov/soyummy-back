const axios = require("axios");

const { setupCache } = require("axios-cache-adapter");

const cache = setupCache({
  maxAge: 180 * 60 * 1000,
});

const instance = axios.create({
  adapter: cache.adapter,
  baseURL: "https://themealdb.com/api/json/v1/1",
});

module.exports = instance;
