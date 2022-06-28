const {
  getQuotations,
  fetchAllChains,
  getTokenPrice,
} = require("../controllers/CryptoPrices");

const router = require("express").Router();

router.post("/fetch-quotations", getQuotations);

router.get("/fetch-all-chains", fetchAllChains);

router.post("/fetch-token-price", getTokenPrice);

module.exports = router;

// payload validation (joi) and the encryption and decryption of the payload using middleware
