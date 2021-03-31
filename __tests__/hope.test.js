const { hope } = require("../src/hope");

test("should...", () => {
  let v = true;
  hope(v).toNot().toBeTrue();
});
