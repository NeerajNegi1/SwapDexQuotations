const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quotationSates = [
  "Init",
  "CoinsReceived",
  "TransferringCoins",
  "Success",
  "Failed",
];

const schema = new Schema(
  {
    buyCoinId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sellCoinId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sellCoinAmount: {
      type: Number,
      required: true,
    },
    buyCoinAmount: {
      type: Number,
    },
    userWalletAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: quotationSates,
    },
    transactionHashFromSwapDexBE: {
      // backend hash
      type: String,
    },
    transactionHashFromSwapDexFE: {
      // frontend hash
      type: String,
    },
  },
  { timestamps: true }
);

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

schema.virtual("buyCoinDetails", {
  ref: "chain",
  localField: "buyCoinId",
  foreignField: "_id",
  justOne: true,
});

schema.virtual("sellCoinDetails", {
  ref: "chain",
  localField: "sellCoinId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Quotation", schema);
