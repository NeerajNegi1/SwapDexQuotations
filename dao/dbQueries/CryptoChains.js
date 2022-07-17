const ChainModel = require("../../model/ChainModel");
const getConfig = require("../../utils/config");
const {
  findCryptoCoinCache,
  updateCryptoChianCache,
} = require("../caching/cryptoChainCache");

const fetchAllCryptoChains = async () => {
  try {
    let cryptoChains = await findCryptoCoinCache("fetchCryptoChains");
    if (cryptoChains) {
      return cryptoChains;
    }
    cryptoChains = await ChainModel.find({
      isEnabled: true,
      isTestnet: await getConfig("testnet"),
    }).populate("defaultCoinDetails");

    // await updateCryptoChianCache("fetchCryptoChains", cryptoChains);
    return cryptoChains;
  } catch (error) {
    return error;
  }
};

module.exports = { fetchAllCryptoChains };
