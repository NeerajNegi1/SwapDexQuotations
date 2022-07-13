const {
  findCryptoUsingIdCache,
  updateCryptoUsingIdCache,
} = require("../dao/caching/cryproPriceCache");
const { fetchCryptoPriceUsingId } = require("../IO/coingecko");

const getCryptoPrices = async (cryptoId, sellTokenAmount) => {
  try {
    const cryptoPrice = await findCryptoUsingIdCache(
      `${cryptoId}_${sellTokenAmount}`
    );
    if (cryptoPrice && cryptoPrice.expires_at > Date.now()) {
      return cryptoPrice;
    }
    const data = await fetchCryptoPriceUsingId(cryptoId);
    data.expires_at = Date.now() + 120000;
    await updateCryptoUsingIdCache(`${cryptoId}_${sellTokenAmount}`, data);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const calculateBuyTokenAmount = async ({
  buyTokenData,
  buyTokenUnitPrice,
  sellTokenData,
  sellTokenUnitPrice,
  sellTokenAmount,
}) => {
  try {
    let totalAmountForSellingSellToken =
      (sellTokenUnitPrice / 10 ** sellTokenData.decimals) * sellTokenAmount; // the token which user is selling

    // have to cut down the commision in percentage from totalAmountForSellingSellToken
    let totalBuyTokenReceivedByUser =
      totalAmountForSellingSellToken / buyTokenUnitPrice; // total number of token which user is buying

    let priceForOneUnitOfBuyToken =
      (totalBuyTokenReceivedByUser / sellTokenAmount) *
      10 ** buyTokenData.decimals;

    return { totalBuyTokenReceivedByUser, priceForOneUnitOfBuyToken };
  } catch (error) {
    console.log(error);
    return 0;
  }
};

module.exports = {
  getCryptoPrices,
  calculateBuyTokenAmount,
};
