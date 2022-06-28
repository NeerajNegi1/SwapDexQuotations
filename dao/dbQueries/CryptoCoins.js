const CryptoCoinsModel = require("../../model/CurrencyModel");

const {
  findCryptoCoinUsingIdCache,
  updateCryptoCoinUsingIdCache,
} = require("../caching/cryptoCurrencyCache");

const fetchCryptoCoinsByCoinId = async (coinId) => {
  try {
    let cryptoCoin = await findCryptoCoinUsingIdCache(coinId);
    if (cryptoCoin) {
      return cryptoCoin;
    }
    cryptoCoin = await CryptoCoinsModel.findOne({ coinId });
    await updateCryptoCoinUsingIdCache(coinId, cryptoCoin);
    return cryptoCoin;
  } catch (error) {
    return error;
  }
};

module.exports = { fetchCryptoCoinsByCoinId };
