const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CryptoCoinsSchema = new Schema({
  coinId: {
    type: String,
  },
  decimals: {
    type: Number,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  networkName: {
    type: String,
  },
  uniqueId: {
    type: String,
  },
  isDefaultCurrency: {
    type: Boolean,
    default: false,
  },
  tokenAddress: {
    type: String,
  },
});

module.exports = mongoose.model("CryptoCoins", CryptoCoinsSchema);
