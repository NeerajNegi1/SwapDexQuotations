const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    coinId: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    networkName: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    isDefaultCurrency: {
      type: Boolean,
      default: false,
    },
    tokenAddress: {
      type: String,
      required: true,
    },
    isTestnet: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cryptoCoin", schema);
