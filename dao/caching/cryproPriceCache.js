const { Level } = require("level");
const cryptoPricesDB = new Level("crypto-prices-cache", {
  valueEncoding: "json",
});

const findCryptoUsingIdLevel = async (cryptoId) => {
  try {
    return await cryptoPricesDB.get(cryptoId);
  } catch (error) {
    return false;
  }
};

const updateCryptoUsingIdLevel = async (id, data) => {
  return await cryptoPricesDB.put(id, data);
};

module.exports = { findCryptoUsingIdLevel, updateCryptoUsingIdLevel };
