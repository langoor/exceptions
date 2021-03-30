const chalk = require("chalk");

class LangoorError extends Error {
  constructor(expected, received) {
    super();
    this.name = "LangoorError";
    this._expected = expected;
    this._received = received;
    this.message = this.render();
  }

  render() {
    return (
      "\n\t" +
      chalk.green`Expected => ${this._expected}` +
      "\n\t" +
      chalk.red`Received => ${this._received}`
    );
  }
}

module.exports = { LangoorError };
