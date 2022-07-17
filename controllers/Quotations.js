const {
  createQuotationService,
  fetchQuotationService,
  changeQuotationStatusService,
  fetchQuotationStatusService,
} = require("../services/Quotations");
const { decryptString } = require("../utils/encryptDecrypt");
const logger = require("../utils/logger");

const createQuotations = async (req, res) => {
  try {
    logger.info({
      description: "Inside createQuotations controller.",
    });
    let response = await createQuotationService(req.body);
    if (!response) throw Error("Something went wrong inside createQuotations.");
    logger.info({
      success: true,
      description: "Successfully created prices.",
      data: response,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully created quotation.",
      orderId: response.id,
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside createQuotations.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

const fetchQuotation = async (req, res) => {
  try {
    logger.info({
      description: "Inside fetchQuotation controller.",
    });
    let response = await fetchQuotationService(req.params);
    if (!response) throw Error("Something went wrong inside fetchQuotation.");
    logger.info({
      success: true,
      description: "Successfully fetched quotation.",
      data: response,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched quotation.",
      data: response,
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside fetchQuotation.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

const changeQuotationStatus = async (req, res) => {
  try {
    logger.info({
      description: "Inside changeQuotationStatus controller.",
    });
    let decryptedData = await decryptString(req.body.data);
    let response = await changeQuotationStatusService(decryptedData);
    if (!response)
      throw Error("Something went wrong inside changeQuotationStatus.");
    logger.info({
      success: true,
      description: "Successfully changed quotation status.",
      data: response,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully changed quotation status.",
      data: response,
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside changeQuotationStatus.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

const fetchQuotationStatus = async (req, res) => {
  try {
    logger.info({
      description: "Inside fetchQuotationStatus controller.",
    });
    let response = await fetchQuotationStatusService(req.params);
    if (!response)
      throw Error("Something went wrong inside fetchQuotationStatus.");
    logger.info({
      success: true,
      description: "Successfully changed quotation status.",
      status: response,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully changed quotation status.",
      status: response,
    });
  } catch (error) {
    logger.error({
      success: false,
      description: "Something went wrong inside fetchQuotationStatus.",
    });
    return res.status(400).json({
      success: false,
      description: "Something went wrong",
    });
  }
};

module.exports = {
  createQuotations,
  fetchQuotation,
  changeQuotationStatus,
  fetchQuotationStatus,
};
