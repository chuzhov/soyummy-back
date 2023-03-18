const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 3600 });

const cacheWrapper = (key, callback) => {
  const func = async (...args) => {
    const cachedData = myCache.get(key);
    if (!cachedData) {
      return await callback(...args);
    }
    return cachedData;
  };
  return func;
};

module.exports = { cacheWrapper, myCache };
