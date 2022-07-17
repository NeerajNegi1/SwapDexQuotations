const { Level } = require("level");
const quotationCache = new Level("quotation-cache", {
  valueEncoding: "json",
});

const getQuotationByIdCache = async (id) => {
  try {
    return await quotationCache.get(id);
  } catch (error) {
    return false;
  }
};

const updateQuotationByIdCache = async (id, data) => {
  return await quotationCache.put(id, data);
};

module.exports = { getQuotationByIdCache, updateQuotationByIdCache };
