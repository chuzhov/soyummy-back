const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 3600 });

const cacheWrapper = (key, callback) => {
  const func = async (req, res) => {
    const cachedData = myCache.get(key);
    if (!cachedData) {
      return await callback(req, res);
    }
    return cachedData;
  };
  return func;
};

module.exports = { cacheWrapper, myCache };
