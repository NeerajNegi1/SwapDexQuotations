const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
    },
    chain: {
      type: String,
    },
    network: {
      type: String,
    },
    icon: {
      type: String,
    },
    rpc: [String],
    faucets: [String],
    nativeCurrency: {
      name: {
        type: String,
      },
      symbol: {
        type: String,
      },
      decimals: {
        type: Number,
      },
    },
    infoURL: {
      type: String,
    },
    shortName: {
      type: String,
    },
    chainId: {
      type: Number,
    },
    networkId: {
      type: Number,
    },
    explorers: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
        icon: {
          type: String,
        },
        standard: {
          type: String,
        },
      },
    ],
    parent: {
      chain: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
    isTestnet: {
      type: Boolean,
      default: false,
    },
    defaultCoin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cryptoCoin",
    },
  },
  { timestamps: true }
);

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("defaultCoinDetails", {
  ref: "cryptoCoin",
  localField: "defaultCoin",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("chain", schema);
