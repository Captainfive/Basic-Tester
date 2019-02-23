// Require NodeJS Dependencies
const { readFile, appendFile } = require("fs").promises

// Require Third-Party Dependencies
const polka = require("polka");
const bodyParser = require("body-parser");
const send = require("@polka/send-type");
const is = require("@slimio/is");
const cherow = require("cherow")

// Constantes
const { Test } = require("../ClassTest.js")

// Helpers 
const { AvaStart } = require("./Tagged.js")
const { TestPartsFunction } = require("./Tagged.js")

// Create POLKA Server
const server = polka();
server.use(bodyParser.json());

server.get("/infos", async (req, res) => {
    const readScript = await readFile(`./${req.body.name}`, "utf8")
    const parseScript = await cherow.parseScript(readScript);
    send(res, 200);
})

// Test endpoint
server.post("/Test", async (req, res) => {
    const readScript = await readFile(`./${req.body.name}`, "utf8")
    const parseScript = await cherow.parseScript(readScript);
    const Init = await new Test(`./${req.body.name}`, parseScript)

    await appendFile("test.js", `${AvaStart.require("avaTest", "ava")}`)
    await appendFile("test.js", `${AvaStart.require("is", "@slimio/is")}\n`)

    for (let valeur of Init.CheckModuleExports(parseScript)) {
        await appendFile("test.js", `${AvaStart.import(valeur, `${req.body.name}`)}`)
    }
    
    // // Retour a la ligne
    const RC = await appendFile("test.js", "\n")
    Init.CheckFunctions(parseScript)

    send(res, 200, "Test crée");
});

module.exports = server