const { isArray } = require("lodash");
const { LangoorError } = require("../langoorError");

module.exports.typeExceptionTemplate = (type, value) => {
  if (type === "array" ? !isArray(value) : typeof received !== "object") {
    throw new LangoorError("type " + type, stringify(value));
  }
};
