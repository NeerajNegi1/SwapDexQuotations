const {
  createQuotation,
  getQuotation,
  updateQuotation,
} = require("../dao/dbQueries/Quotations");

const createQuotationService = async (data) => {
  try {
    const {
      buyCoinId,
      sellCoinId,
      sellCoinAmount,
      buyCoinAmount,
      userWalletAddress,
    } = data;
    let response = await createQuotation({
      buyCoinId,
      sellCoinId,
      sellCoinAmount,
      buyCoinAmount,
      userWalletAddress,
      status: "Init",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchQuotationService = async ({ quotationId }) => {
  try {
    if (!quotationId) {
      throw Error("Order id not found.");
    }
    let response = await getQuotation(quotationId);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const changeQuotationStatusService = async ({ quotationId, status }) => {
  try {
    if (!quotationId || !status) {
      throw Error("Order id not found.");
    }
    let response = await updateQuotation({ _id: quotationId }, { status });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchQuotationStatusService = async ({ id }) => {
  try {
    if (!id) {
      throw Error("Order id not found.");
    }
    let response = await getQuotation(id);

    return response.status;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createQuotationService,
  fetchQuotationService,
  changeQuotationStatusService,
  fetchQuotationStatusService,
};
