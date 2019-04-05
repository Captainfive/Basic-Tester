const { taggedString } = require("@slimio/utils");

// Start Declarations
const AvaStart = {
    import: taggedString`const {${0} } = require("./${1}");\n`,
    require: taggedString`const ${0} = require("${1}");\n`,
}

// Pre-built sentences
const TestPartsFunction = {
    avaStartFunction: taggedString`avaTest("Function ${0}", (assert) => {\n`,
    avaIsFunction: taggedString`    assert.true(is.func(${0}))\n`,
    avaIsAsyncFunction: taggedString`    assert.true(is.asyncFunction(${0}))\n`,
    avaFunctionReturnNumber: taggedString`    assert.true(is.number(${0}(10)))\n`,
    avaFunctionReturnString: taggedString`    assert.true(is.string(${0}()))\n`,
    avaFunctionReturnBoolean: taggedString`    assert.true(is.boolean(${0}()))\n`,
    avaFunctionReturnNull: taggedString`    assert.true(is.nullValue(${0}()))\n`,
    avaFunctionReturnObject: taggedString`    assert.true(is.object(${0}))\n`,
    avaFunctionReturnPlainObject: taggedString`    assert.true(is.plainObject(${0}()))\n`,
    avaFunctionReturnPromise: taggedString`    assert.true(is.promise(${0}()))\n`,
    avaFunctionReturnArray: taggedString`    assert.true(is.array(${0}()))\n`,
    avaFunctionReturnClass: taggedString`    assert.true(is.classObject(new ${0}()))\n`,
    avaFunctionReturnSet: taggedString`    assert.true(is.set(new ${0}()))\n`,
    avaFunctionReturnWeakSet: taggedString`    assert.true(is.weakSet(new ${0}()))\n`,
    avaFunctionReturnMap: taggedString`    assert.true(is.map(new ${0}()))\n`,
    avaFunctionReturnWeakMap: taggedString`    assert.true(is.weakMap(new ${0}()))\n`,
    avaFunctionReturnBigint: taggedString`    assert.true(is.bigint(${0}()))\n`,
    avaFunctionReturnBuffer: taggedString`    assert.true(is.buffer(${0}()))\n`,
    avaFunctionReturnDate: taggedString`    assert.true(is.date(${0}()))\n`,
    avaFunctionReturnRegExp: taggedString`    assert.true(is.regExp(${0}()))\n`,
    avaFunctionReturnError: taggedString`    assert.true(is.error(${0}()))\n`,
    avaEND: `});\n\n`,
};
module.exports = { AvaStart, TestPartsFunction }