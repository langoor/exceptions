const { isArray } = require("lodash");
const { LangoorError } = require("./langoorError");
const stringify = JSON.stringify;

const hope = (received) => {
  let defaultMethods = {
    // Equality check functions
    toBe: (expected) => {
      if (!Object.is(expected, received)) {
        throw new LangoorError(stringify(expected), stringify(received));
      }
    },
    toEqual: (expected) => {
      if (expected != received) {
        throw new LangoorError(stringify(expected), stringify(received));
      }
    },
    toStrictEqual: (expected) => {
      if (expected !== received) {
        throw new LangoorError(stringify(expected), stringify(received));
      }
    },

    // Type check functions
    toBeArray: () => {
      if (!isArray(received)) {
        throw new LangoorError("<type Array>", stringify(received));
      }
    },
    toBeObject: () => {
      if (typeof received !== "object") {
        throw new LangoorError("<type Object>", stringify(received));
      }
    },
    toBeString: () => {
      if (typeof received !== "string") {
        throw new LangoorError("<type String>", stringify(received));
      }
    },
    toBeNumber: () => {
      if (typeof received !== "number") {
        throw new LangoorError("<type Number>", stringify(received));
      }
    },
    toBeDefined: () => {
      if (typeof received === "undefined") {
        throw new LangoorError("<defined>", stringify(received));
      }
    },
    toBeNotNull: () => {
      if (received === null) {
        throw new LangoorError("<not-null>", stringify(received));
      }
    },
    toBeTrue: () => {
      if (!received) {
        throw new LangoorError(stringify(true), stringify(received));
      }
    },
    toBeFalse: () => {
      if (received) {
        throw new LangoorError(stringify(false), stringify(received));
      }
    },

    // Error functions
    toThrow: () => {
      let threw = false;
      try {
        if (typeof received !== "function")
          throw new TypeError("toThrow expectes a function argument");
        received();
      } catch (_) {
        threw = true;
      }

      if (!threw) throw new LangoorError("<throw>", "<no-throw>");
    },

    // Object functions
    toContainProperty: (expected) => {
      if (!(expected in received)) {
        throw new LangoorError(
          "<contain prop " + stringify(expected) + " >",
          stringify(received)
        );
      }
    },

    // Function return check
    toReturnValue: () => {
      if (typeof received !== "function")
        throw new TypeError("toReturnValue expectes a function argument");
      if (typeof received() === "undefined" || received() === null) {
        throw new LangoorError("<return>", received());
      }
    },

    // Regexp
    toRegexMatch: (re) => {
      if (!(re instanceof RegExp)) {
        throw new TypeError("toMatch expectes a function argument");
      }

      if (!re.test(received)) {
        throw new LangoorError(`<match regexp ${re} >`, received);
      }
    },
  };

  let notMethods = {
    // Equality check functions
    toBe: (expected) => {
      if (Object.is(expected, received)) {
        throw new LangoorError(
          `not ${stringify(expected)}`,
          stringify(received)
        );
      }
    },
    toEqual: (expected) => {
      if (expected == received) {
        throw new LangoorError(
          `not ${stringify(expected)}`,
          stringify(received)
        );
      }
    },
    toStrictEqual: (expected) => {
      if (expected === received) {
        throw new LangoorError(
          `not ${stringify(expected)}`,
          stringify(received)
        );
      }
    },

    // Type check functions
    toBeArray: () => {
      if (isArray(received)) {
        throw new LangoorError("<not type Array>", stringify(received));
      }
    },
    toBeObject: () => {
      if (typeof received === "object") {
        throw new LangoorError("<not type Object>", stringify(received));
      }
    },
    toBeString: () => {
      if (typeof received === "string") {
        throw new LangoorError("<not type String>", stringify(received));
      }
    },
    toBeNumber: () => {
      if (typeof received === "number") {
        throw new LangoorError("<not type Number>", stringify(received));
      }
    },
    toBeDefined: () => {
      if (typeof received !== "undefined") {
        throw new LangoorError("<undefined>", stringify(received));
      }
    },
    toBeNotNull: () => {
      if (received !== null) {
        throw new LangoorError("<null>", stringify(received));
      }
    },
    toBeTrue: () => {
      if (received) {
        throw new LangoorError(stringify(!true), stringify(received));
      }
    },
    toBeFalse: () => {
      if (!received) {
        throw new LangoorError(stringify(!false), stringify(received));
      }
    },

    // Error functions
    toThrow: () => {
      let threw = false;
      try {
        if (typeof received !== "function")
          throw new TypeError("toThrow expectes a function argument");
        received();
      } catch (_) {
        threw = true;
      }

      if (threw) throw new LangoorError("<no-throw>", "<throw>");
    },

    // Object functions
    toContainProperty: (expected) => {
      if (expected in received) {
        throw new LangoorError(
          "<not contain prop " + stringify(expected) + " >",
          stringify(received)
        );
      }
    },

    // Function return check
    toReturnValue: () => {
      if (typeof received !== "function")
        throw new TypeError("toReturnValue expectes a function argument");
      if (typeof received() !== "undefined" || received() !== null) {
        throw new LangoorError("<no-return>", received());
      }
    },

    // Regexp
    toRegexMatch: (re) => {
      if (!(re instanceof RegExp)) {
        throw new TypeError("toMatch expectes a function argument");
      }

      if (re.test(received)) {
        throw new LangoorError(`<not match regexp ${re} >`, received);
      }
    },
  };

  return { ...defaultMethods, toNot: () => notMethods };
};

module.exports = { hope };
