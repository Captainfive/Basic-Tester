const { taggedString } = require("@slimio/utils");

// Helpers 
const AvaStart = {
    import: taggedString`const { ${0} } = require("./${1}");\n`,
    require: taggedString`const ${0} = require("${1}");\n`,
}

const TestPartsFunction = {
    avaStartFunction: taggedString`avaTest("Function ${0}", (assert) => {\n`,
    avaIsFunction: taggedString`    assert.true(is.func(${0}))\n`,
    avaFunctionReturnNumber: taggedString`  assert.true(is.number(${0}(10)))\n`,
    avaFunctionReturnString: taggedString`  assert.true(is.string(${0}()))\n`,
    avaEND: `});\n`,

};
module.exports = { AvaStart, TestPartsFunction }