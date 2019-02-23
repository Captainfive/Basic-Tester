const avaTest = require("ava");
const is = require("@slimio/is");

const { func } = require("./outputest.js");
const { nombre } = require("./outputest.js");
const { string } = require("./outputest.js");
const { object } = require("./outputest.js");
const { Promis } = require("./outputest.js");
const { array } = require("./outputest.js");
const { classes } = require("./outputest.js");
const { obj } = require("./outputest.js");


avaTest("Function func", (assert) => {
    assert.true(is.func(func))
});
avaTest("Function nombre", (assert) => {
    assert.true(is.number(nombre(10)))
});
avaTest("Function string", (assert) => {
    assert.true(is.string(string()))
});
avaTest("Function object", (assert) => {
    assert.true(is.func(object))
    assert.true(is.plainObject(object()))
});
avaTest("Function Promis", (assert) => {
    assert.true(is.func(Promis))
    assert.true(is.promise(Promis()))
});
avaTest("Function array", (assert) => {
    assert.true(is.func(array))
    assert.true(is.array(array()))
});
avaTest("Function classes", (assert) => {
    assert.true(is.func(classes))
    assert.true(is.classObject(new classes()))
});
avaTest("Function obj", (assert) => {
    assert.true(is.string(obj()))
});
