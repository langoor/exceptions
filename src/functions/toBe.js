const { LangoorError } = require("../langoorError");

module.exports.toBe = (expected, received) => {
  if (!Object.is(expected, received)) {
    throw new LangoorError(stringify(expected), stringify(received));
  }
};
