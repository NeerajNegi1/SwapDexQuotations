const QuotationModel = require("../../model/QuotationModel");
const {
  getQuotationByIdCache,
  updateQuotationByIdCache,
} = require("../caching/QuotationCache");

const createQuotation = async (data) => {
  try {
    let response = await QuotationModel.create(data);
    return response;
  } catch (error) {
    return error;
  }
};

const getQuotation = async (id) => {
  try {
    // let quotation = await getQuotationByIdCache(id);
    // if (quotation) {
    //   return quotation;
    // }
    let quotation = await QuotationModel.findById(id).populate([
      {
        path: "buyCoinDetails",
        populate: ["defaultCoin"],
      },
      {
        path: "sellCoinDetails",
        populate: ["defaultCoin"],
      },
    ]);
    // await updateQuotationByIdCache(id, quotation);
    return quotation;
  } catch (error) {
    return error;
  }
};

const updateQuotation = async (filter, update) => {
  try {
    let response = await QuotationModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    await updateQuotationByIdCache(filter._id, response);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { createQuotation, getQuotation, updateQuotation };
