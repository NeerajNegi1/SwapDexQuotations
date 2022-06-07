const CryptoCoins = require("../../model/CurrencyModel");
const {
  findCryptoCoinUsingIdLevel,
  updateCryptoCoinUsingIdLevel,
} = require("../caching/cryptoCurrencyCache");

const fetchCryptoCoinsByCoinId = async (coinId) => {
  try {
    let cryptoCoin = await findCryptoCoinUsingIdLevel(coinId);
    if (cryptoCoin) {
      return cryptoCoin;
    }
    cryptoCoin = await CryptoCoins.findOne({ coinId });
    await updateCryptoCoinUsingIdLevel(coinId, cryptoCoin);
    return cryptoCoin;
  } catch (error) {
    return error;
  }
};

module.exports = { fetchCryptoCoinsByCoinId };