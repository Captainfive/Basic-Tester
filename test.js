const avaTest = require("ava");
const is = require("@slimio/is");

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


avaTest("Function nombre", (assert) => {
    assert.true(is.number(nombre(10)))
});

avaTest("Function string", (assert) => {
    assert.true(is.string(string()))
});

avaTest("Function object", (assert) => {
    assert.true(is.func(object))
    assert.true(is.object(object))
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

avaTest("Function obje", (assert) => {
    assert.true(is.func(obje))
    assert.true(is.object(obje))
});

avaTest("Function isSet", (assert) => {
    assert.true(is.func(isSet))
    assert.true(is.set(new isSet()))
});

avaTest("Function isMap", (assert) => {
    assert.true(is.func(isMap))
    assert.true(is.map(new isMap()))
});

avaTest("Function isWeakMap", (assert) => {
    assert.true(is.func(isWeakMap))
    assert.true(is.weakMap(new isWeakMap()))
});

