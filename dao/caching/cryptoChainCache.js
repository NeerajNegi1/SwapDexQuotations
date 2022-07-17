const { Level } = require("level");
const cryptoChainCache = new Level("crypto-chain-cache", {
  valueEncoding: "json",
});

const findCryptoCoinCache = async (type) => {
  try {
    return await cryptoChainCache.get(type);
  } catch (error) {
    return false;
  }
};

const updateCryptoChianCache = async (id, data) => {
  return await cryptoChainCache.put(id, data);
};

module.exports = { findCryptoCoinCache, updateCryptoChianCache };
