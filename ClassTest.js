// Require NodeJS Dependencies
const { appendFile } = require("fs").promises

// Helpers 
const { AvaStart } = require("./src/Tagged")
const { TestPartsFunction } = require("./src/Tagged")

class Test {
    constructor(ScriptPath, ScriptParsed) {
        this.ScriptPath = ScriptPath
        this.ScriptParsed = ScriptParsed
    }

    async CheckFunctions(Scriptparsed) {
        // Constants
        const RC = await appendFile("test.js", "\n")
        let arr = []
        for (const obj of Scriptparsed.body) {
            if (obj.type === "FunctionDeclaration") {
                if (obj.body.body[0].type === "ReturnStatement") {
                    if (obj.body.body[0].argument.type === "ObjectExpression") {
                        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnObject(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                    }
                    if (obj.body.body[0].argument.type === "ClassExpression") {
                        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnClass(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                    }
                    if (obj.body.body[0].argument.type === "ArrayExpression") {
                        if (obj.body.body[0].argument.elements.length === 0){
                            await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnArray(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                        }
                    }
                    if (obj.body.body[0].argument.type === "NewExpression") {
                        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnPromise(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                    }
                    console.log(obj.body.body[0]);
                    if (obj.body.body[0].argument.type === "Identifier") {
                        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                        await RC
                    }
                    if (obj.body.body[0].argument.type === "Literal") {
                        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                        if (typeof (obj.body.body[0].argument.value) === "string") {
                            await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnString(obj.id.name)}`)
                        }
                        if (typeof (obj.body.body[0].argument.value) === "number") {
                            await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnNumber(obj.id.name)}`)
                        }
                        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                        await RC
                    }
                    if (obj.body.body[0].argument.type === "CallExpression") {
                        if (obj.body.body[0].argument.callee.object.name === "Object") {
                            await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaFunctionReturnPlainObject(obj.id.name)}`)
                            await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                            await RC
                        }
                    }
                }
            }
        }
        return arr
    }

    CheckModuleExports(Scriptparsed) {
        let arr = []
        for (const obj of Scriptparsed.body) {
            if (obj.type === "ExpressionStatement") {
                if (obj.expression.left.object.name === "module" && obj.expression.left.property.name === "exports") {
                    if (obj.expression.right.type === "Identifier") {
                        return obj.expression.right.name
                    }
                    if (obj.expression.right.type === "ObjectExpression") {
                        for (const object of obj.expression.right.properties)
                            if (object.type === "Property") {
                                arr.push(object.key.name)
                            }
                    }
                }
            }
        }
        return arr
    }
}
module.exports = { Test }
