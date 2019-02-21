// Require NodeJS Dependencies
const { readFile, appendFile } = require("fs").promises

// Require Third-Party Dependencies
const polka = require("polka");
const bodyParser = require("body-parser");
const send = require("@polka/send-type");
const { taggedString } = require("@slimio/utils");
const is = require("@slimio/is");
const cherow = require("cherow")

// Constantes
const { Test } = require("../ClassTest.js")

// Helpers 
const AvaStart = {
    import: taggedString`const ${0} = require("../${1}");\n`,
    require: taggedString`const ${0} = require("${1}");\n`,
}

const TestPartsFunction = {
    avaStartFunction: taggedString`avaTest("Function ${0}", (assert) => {\n`,
    avaIsFunction: taggedString`assert(is.func(${0})\n`,
    avaFunctionReturnNumber: taggedString`assert(is.number(${0}(10, 10)))\n`,
    avaEND: `};\n`,

};

// Create POLKA Server
const server = polka();
server.use(bodyParser.json());

server.get("/infos", async (req, res) => {
    const readScript = await readFile(`./${req.body.name}`, "utf8")
    const parseScript = await cherow.parseScript(readScript);

    console.log(parseScript.body[0].body.body);
    console.log(parseScript.body[1].body.body);
    console.log(parseScript.body[0].id.name);
    console.log(parseScript.body[0].body.body[0].argument.type);
    console.log(parseScript.body[1].id.name);
    console.log(parseScript.body[1].body.body[0].argument.type);
    // console.log(parseScript.body[0].body.body[0].argument.left.name);
    // console.log(parseScript.body[0].body.body[0].argument.operator);
    // console.log(parseScript.body[0].body.body[0].argument.right.name);
    send(res, 200);
})
// Test endpoint
server.post("/Test", async (req, res) => {
    const readScript = await readFile(`./${req.body.name}`, "utf8")
    const parseScript = await cherow.parseScript(readScript);
    const Init = new Test(`./${req.body.name}`, parseScript)

    await appendFile("test.js", `${AvaStart.require("avaTest", "ava")}`)
    await appendFile("test.js", `${AvaStart.require("is", "@slimio/is")}\n`)

    // // Retour a la ligne
    // const RC = await appendFile("test.js", "\n")
    for (let valeur of Init.CheckModuleExports(parseScript)) {
        await appendFile("test.js", `${AvaStart.import(valeur, `${req.body.name}`)}`)
    }
    console.log(Init.CheckFunctions(parseScript));

    send(res, 200, "Test crée");
});

module.exports = server