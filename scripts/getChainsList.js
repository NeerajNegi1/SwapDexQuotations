const axios = require("axios");

const checkType = (value) => {
  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    return "OBJECT";
  }
  if (Array.isArray(value)) {
    return "ARRAY";
  }
  if (typeof value === "string") {
    return "STRING";
  }
  if (typeof value === "number") {
    return "NUMBER";
  }
  if (typeof value === "boolean") {
    return "BOOLEAN";
  }
};

const getChain = async () => {
  let model = {};
  const response = await axios.get(`https://chainid.network/chains.json`);
  model = createModel({}, response.data[177]);
  console.log(JSON.stringify(model));
};

const createModel = (model = {}, item) => {
  for (let key in item) {
    if (checkType(item[key]) === "STRING") {
      model[key] = {
        type: "String",
      };
    }
    if (checkType(item[key]) === "NUMBER") {
      model[key] = {
        type: "Number",
      };
    }
    if (checkType(item[key]) === "BOOLEAN") {
      model[key] = {
        type: "Boolean",
      };
    }
    if (checkType(item[key]) === "ARRAY") {
      model[key] = [createModel({}, item[key][0])];
    }
    if (checkType(item[key]) === "OBJECT") {
      model[key] = createModel({}, item[key]);
    }
  }
  return model;
};

getChain();

// 13 keys max;
