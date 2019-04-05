#!/usr/bin/env node

// Require Internal Dependencies
const { readdir, appendFile, readFile } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
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
    // Helpers
    const ExportRequire = []
    const cwd = process.cwd();
    let count = 0

    // Verifies that the command does not run at the root of the project
    if (cwd === ROOT_DIR || cwd === __dirname) {
        throw new Error("Cannot execute at the root of the project");
    }
    
    // Read the folder or the command is invoke
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
    // Read the selected file
    const readScript = await readFile(`${response.FilesToTest}`, "utf8")
    // Parse the selected file with an abstract syntax tree called CHEROW
    const parseScript = await cherow.parseScript(readScript);
    // Pushed into a class
    const Init = await new Algo(`${response.FilesToTest}`, parseScript)

    // Write the necessary requirements for ava testing
    await appendFile("test.js", `${AvaStart.require("avaTest", "ava")}`)
    await appendFile("test.js", `${AvaStart.require("is", "@slimio/is")}\n`)

    // Loop that allows automatic return to line for variable import
    for (let valeur of Init.CheckModuleExports(parseScript)) {
        count += 1
        let space = " "
        if (count > 5) {
            await ExportRequire.push("\n" + valeur)
            count = 0
            continue
        }
        await ExportRequire.push(space + valeur)
    }
    
    // Write the imports into the test.js file
    await appendFile("test.js", `${AvaStart.import(ExportRequire, `${response.FilesToTest}`)}`)
    
    // // Retour a la ligne
    const RC = await appendFile("test.js", "\n")
    Init.CheckFunctions(parseScript)
}
main().catch(console.error);