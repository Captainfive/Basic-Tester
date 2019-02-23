const avaTest = require("ava");
const is = require("@slimio/is");

const { add } = require("./outputest.js");
const { nombre } = require("./outputest.js");
const { yop } = require("./outputest.js");


avaTest("Function add", (assert) => {
    assert.true(is.func(add))
});
avaTest("Function nombre", (assert) => {
  assert.true(is.number(nombre(10)))
});
avaTest("Function yop", (assert) => {
  assert.true(is.string(yop()))
});
