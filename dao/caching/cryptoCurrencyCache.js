const { Level } = require("level");
const cryptoCoinsDB = new Level("crypto-coins-cache", {
  valueEncoding: "json",
});

const findCryptoCoinUsingIdLevel = async (cryptoId) => {
  try {
    return await cryptoCoinsDB.get(cryptoId);
  } catch (error) {
    return false;
  }
};

const updateCryptoCoinUsingIdLevel = async (id, data) => {
  return await cryptoCoinsDB.put(id, data);
};

module.exports = { findCryptoCoinUsingIdLevel, updateCryptoCoinUsingIdLevel };
