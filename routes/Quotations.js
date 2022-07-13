const {
  createQuotations,
  fetchQuotation,
  changeQuotationStatus,
  fetchQuotationStatus,
} = require("../controllers/Quotations");

const router = require("express").Router();

router.post("/create-quotations", createQuotations);

router.get("/fetch-quotation/:quotationId", fetchQuotation);

router.post("/change-quotation-status", changeQuotationStatus);

router.get("/quotation-status/:id", fetchQuotationStatus);

module.exports = router;

// payload validation (joi) and the encryption and decryption of the payload using middleware
