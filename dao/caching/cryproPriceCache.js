const { Level } = require("level");
const cryptoPricesCache = new Level("crypto-prices-cache", {
  valueEncoding: "json",
});

const findCryptoUsingIdCache = async (cryptoId) => {
  try {
    return await cryptoPricesCache.get(cryptoId);
  } catch (error) {
    return false;
  }
};

const updateCryptoUsingIdCache = async (id, data) => {
  return await cryptoPricesCache.put(id, data);
};

module.exports = { findCryptoUsingIdCache, updateCryptoUsingIdCache };
