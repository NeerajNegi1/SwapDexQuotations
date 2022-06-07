const { getQuotations, fetchAllCoins } = require("../controllers/CryptoPrices");

const router = require("express").Router();

router.post("/fetch-quotations", getQuotations);

router.get("/fetch-all-coins", fetchAllCoins);

module.exports = router;
