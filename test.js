const avaTest = require("ava");
const is = require("@slimio/is");

const { func } = require("./outputest.js");
const { nombre } = require("./outputest.js");
const { string } = require("./outputest.js");
const { object } = require("./outputest.js");
const { Promis } = require("./outputest.js");
const { array } = require("./outputest.js");
const { classes } = require("./outputest.js");
const { obje } = require("./outputest.js");
const { isSet } = require("./outputest.js");
const { isMap } = require("./outputest.js");
const { isWeakMap } = require("./outputest.js");


avaTest("Function func", (assert) => {
    assert.true(is.func(func))
    assert.true(is.nullValue(func))
});

avaTest("Function nombre", (assert) => {
    assert.true(is.number(nombre(10)))
});

avaTest("Function string", (assert) => {
    assert.true(is.string(string()))
});

avaTest("Function object", (assert) => {
    assert.true(is.func(object))
    assert.true(is.nullValue(object))
});

avaTest("Function Promis", (assert) => {
    assert.true(is.func(Promis))
    assert.true(is.nullValue(Promis))
});

avaTest("Function array", (assert) => {
    assert.true(is.func(array))
    assert.true(is.nullValue(array))
});

avaTest("Function classes", (assert) => {
    assert.true(is.func(classes))
    assert.true(is.nullValue(classes))
});

avaTest("Function obje", (assert) => {
    assert.true(is.func(obje))
    assert.true(is.nullValue(obje))
});

avaTest("Function isSet", (assert) => {
    assert.true(is.func(isSet))
    assert.true(is.nullValue(isSet))
});

avaTest("Function isMap", (assert) => {
    assert.true(is.func(isMap))
    assert.true(is.nullValue(isMap))
});

avaTest("Function isWeakMap", (assert) => {
    assert.true(is.func(isWeakMap))
    assert.true(is.nullValue(isWeakMap))
});

