const { LangoorError } = require("../langoorError");

module.exports.toBeEqual = (expected, received) => {
  if (expected !== received) {
    throw new LangoorError(stringify(expected), stringify(received));
  }
};
