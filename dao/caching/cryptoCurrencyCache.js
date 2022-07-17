const { Level } = require("level");
const cryptoCoinsCache = new Level("crypto-coins-cache", {
  valueEncoding: "json",
});

const findCryptoCoinUsingIdCache = async (cryptoId) => {
  try {
    return await cryptoCoinsCache.get(cryptoId);
  } catch (error) {
    return false;
  }
};

const updateCryptoCoinUsingIdCache = async (id, data) => {
  return await cryptoCoinsCache.put(id, data);
};

module.exports = { findCryptoCoinUsingIdCache, updateCryptoCoinUsingIdCache };
