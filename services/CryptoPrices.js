const {
  findCryptoUsingIdLevel,
  updateCryptoUsingIdLevel,
} = require("../dao/caching/cryproPriceCache");
const { fetchCryptoPriceUsingId } = require("../IO/coingecko");

const getCryptoPrices = async (cryptoId) => {
  try {
    const cryptoPrice = await findCryptoUsingIdLevel(cryptoId);
    if (cryptoPrice && cryptoPrice.expires_at > Date.now()) {
      return cryptoPrice;
    }
    const data = await fetchCryptoPriceUsingId(cryptoId);
    data.expires_at = Date.now() + 60000;
    await updateCryptoUsingIdLevel(cryptoId, data);
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

    return totalBuyTokenReceivedByUser;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

module.exports = { getCryptoPrices, calculateBuyTokenAmount };
