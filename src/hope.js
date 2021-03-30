const { isArray } = require("lodash");
const { LangoorError } = require("./langoorError");
const { toBe } = require("./functions/toBe");
global.stringify = JSON.stringify;

const hopei = (received) => {
  return {
    toBe: (expected) => {
      if (!Object.is(expected, received)) {
        throw new LangoorError(expected, stringify(received));
      }
    },
    toEqual: (expected) => {
      if (expected != received) {
        throw new LangoorError(expected, stringify(received));
      }
    },
    toStrictEqual: (expected) => {
      if (expected !== received) {
        throw new LangoorError(expected, stringify(received));
      }
    },
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
    toThrow: () => {
      let throwed = false;
      try {
        if (typeof received === "function") received();
      } catch (_) {
        throwed = true;
      }
      if (!throwed)
        throw new LangoorError(
          "function to throw error",
          "did not throw error"
        );
    },
    toContainProperty: (expected) => {
      if (!(expected in received)) {
        throw new LangoorError(
          "to contain property " + stringify(expected),
          stringify(received)
        );
      }
    },
    toReturnValue: () => {
      if (typeof received === "function" && !received()) {
        throw new LangoorError("to return a value", "no return value");
      }
    },
  };
};

test("hmm", () => {
  toBe("a", "b");
});
