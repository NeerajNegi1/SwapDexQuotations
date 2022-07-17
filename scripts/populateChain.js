const mongoose = require("mongoose");
const axios = require("axios");
const ChainModel = require("../model/ChainModel");
const getConfig = require("../utils/config");

const populateChains = async () => {
  await mongoose.connect(await getConfig("dbUrl"));
  const response = await axios.get(`https://chainid.network/chains.json`);
  const chains = response.data;

  let dbResponse = await ChainModel.insertMany(chains);
  console.log(dbResponse);
};

// populateChains();

const enableChains = async () => {
  await mongoose.connect(await getConfig("dbUrl"));
  let dbResponse = await ChainModel.updateMany(
    {
      _id: {
        $in: [
          "62b822b2d83c08aea91026e7",
          "62b822b2d83c08aea9102930",
          "62b822b2d83c08aea910276a",
          "62b822b2d83c08aea91028fe",
        ],
      },
    },
    { $set: { isEnabled: true, isTestnet: true } }
  );
  console.log(dbResponse);
};

enableChains();
