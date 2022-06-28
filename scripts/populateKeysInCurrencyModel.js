const mongoose = require("mongoose");
const axios = require("axios");
const CurrencyModel = require("../model/CurrencyModel");
const getConfig = require("../utils/config");

const populateKeysInCurrencyModel = async () => {
  await mongoose.connect(await getConfig("dbUrl"));
  const currencies = await CurrencyModel.find({});
  currencies.forEach(async (currency) => {
    const {
      coinId,
      decimals,
      image,
      name,
      symbol,
      networkName,
      uniqueId,
      isDefaultCurrency,
      tokenAddress,
      isEnabled,
    } = currency;
    const newCurrency = new CurrencyModel({
      coinId,
      decimals,
      image,
      name,
      symbol,
      networkName,
      uniqueId,
      isDefaultCurrency,
      tokenAddress,
      isEnabled: true,
    });
    await newCurrency.save();
  });
};

// populateKeysInCurrencyModel();

let data = [
  {
    coinId: "binancecoin",
    decimals: 18,
    image:
      "https://res.cloudinary.com/neerajnegi2603/image/upload/v1656232832/SwapDex/crypto%20coins/800px-Binance-coin-bnb-logo_frkn3p.png",
    name: "Binance Smart Chain Mainnet",
    symbol: "BNB",
    networkName: "Binance Smart Chain Mainnet",
    uniqueId: "binancecoin",
    isDefaultCurrency: true,
    isEnabled: true,
  },
  {
    coinId: "avalanche-2",
    decimals: 18,
    image:
      "https://res.cloudinary.com/neerajnegi2603/image/upload/v1656233188/SwapDex/crypto%20coins/coin-round-red_nnvedj.png",
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    networkName: "Avalanche C-Chain",
    uniqueId: "avalanche-2",
    isDefaultCurrency: true,
    isEnabled: true,
    tokenAddress: "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
  },
];

const addCoinsIntoDb = async () => {
  await mongoose.connect(await getConfig("dbUrl"));
  let response = await CurrencyModel.insertMany(data);
  console.log(response);
};

addCoinsIntoDb();
