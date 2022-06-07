const {
  fetchCryptoCoinsByCoinId,
  fetchAllCryptoCoins,
} = require("../dao/dbQueries/CryptoCoins");
const {
  getCryptoPrices,
  calculateBuyTokenAmount,
} = require("../services/CryptoPrices");
const logger = require("../utils/logger");

const getQuotations = async (req, res) => {
  try {
    logger.info({
      description: "Inside getQuotations controller.",
      data: { ...req.body },
    });
    const { buyTokenId, sellTokenId, sellTokenAmount } = req.body;

    let fetchCryptoCoins = await Promise.all([
      fetchCryptoCoinsByCoinId(buyTokenId),
      fetchCryptoCoinsByCoinId(sellTokenId),
    ]);

    const buyTokenData = fetchCryptoCoins[0];
    const sellTokenData = fetchCryptoCoins[1];

    if (!buyTokenData || !sellTokenData) {
      logger.info({
        success: false,
        description: "Invalid token id's",
      });
      return res.status(400).json({
        success: false,
        message: "Invalid token id's",
      });
    }
    let promises = await Promise.all([
      getCryptoPrices(buyTokenId),
      getCryptoPrices(sellTokenId),
    ]);
    let totalBuyTokenReceivedByUser = await calculateBuyTokenAmount({
      buyTokenData,
      buyTokenUnitPrice: promises[0].inr,
      sellTokenData,
      sellTokenUnitPrice: promises[1].inr,
      sellTokenAmount,
    });
    logger.info({
      success: true,
      description: "Successfully fetched quotations.",
      data: {
        totalBuyTokenReceivedByUser,
      },
    });
    return res.status(200).json({
      success: true,
      data: {
        totalBuyTokenReceivedByUser,
        message: "Successfully fetched quotations.",
      },
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside getQuotations.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

const fetchAllCoins = async (req, res) => {
  try {
    logger.info({
      description: "Inside fetchAllCoins controller.",
    });
    let coins = await fetchAllCryptoCoins();
    logger.info({
      success: true,
      description: "Successfully fetched all coins.",
      data: {
        coins,
      },
    });
    return res.status(200).json({
      success: true,
      data: {
        coins,
        message: "Successfully fetched all coins.",
      },
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside fetchAllCoins.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

const getTokenPrice = async (req, res) => {
  try {
    logger.info({
      description: "Inside getTokenPrice controller.",
    });
    const { buyTokenId, sellTokenId } = req.body;
    if (!buyTokenId || !sellTokenId) {
      logger.info({
        success: false,
        description: "Invalid token id's",
      });
      return res.status(400).json({
        success: false,
        message: "Invalid token id's",
      });
    }
    let promises = await Promise.all([
      getCryptoPrices(buyTokenId),
      getCryptoPrices(sellTokenId),
    ]);

    logger.info({
      success: true,
      description: "Successfully fetched prices.",
      data: {
        buyTokenIdPrice: promises[0].inr,
        sellTokenIdPrice: promises[1].inr,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all coins.",
      data: {
        buyTokenIdPrice: promises[0].inr,
        sellTokenIdPrice: promises[1].inr,
      },
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside getTokenPrice.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

module.exports = { fetchAllCoins, getQuotations, getTokenPrice };
