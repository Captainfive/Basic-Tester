#!/usr/bin/env node

// Require Internal Dependencies
const { readdir, appendFile, readFile } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
// const { yellow } = require("kleur");
const inquirer = require("inquirer");
const cherow = require("cherow")

// CONSTANTS
const ROOT_DIR = join(__dirname, "..");
const { Algo } = require("../src/ClassAlgo")
const { AvaStart } = require("../src/Tagged")

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    const cwd = process.cwd();
    if (cwd === ROOT_DIR || cwd === __dirname) {
        throw new Error("Cannot execute at the root of the project");
    }
    const headerDir = await readdir(cwd);
    
    // Ask which files should be tested
    const response = await inquirer.prompt([
        {
            "message": "Select Files you want to test",
            "type": "list",
            "name": "FilesToTest",
            "choices": headerDir
        }
    ]);

    const readScript = await readFile(`${response.FilesToTest}`, "utf8")
    const parseScript = await cherow.parseScript(readScript);
    const Init = await new Algo(`${response.FilesToTest}`, parseScript)

    await appendFile("test.js", `${AvaStart.require("avaTest", "ava")}`)
    await appendFile("test.js", `${AvaStart.require("is", "@slimio/is")}\n`)

    const ExportRequire = []
    for (let valeur of Init.CheckModuleExports(parseScript)) {
        let space = " "
        await ExportRequire.push(space + valeur)
    }
    await appendFile("test.js", `${AvaStart.import(ExportRequire, `${response.FilesToTest}`)}`)
    
    // // Retour a la ligne
    const RC = await appendFile("test.js", "\n")
    Init.CheckFunctions(parseScript)
}
main().catch(console.error);