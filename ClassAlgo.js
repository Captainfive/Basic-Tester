// Require NodeJS Dependencies
const { appendFile } = require("fs").promises

// Helpers 
const { TestPartsFunction } = require("./src/Tagged")

class Algo {
    constructor(ScriptPath, ScriptParsed) {
        this.ScriptPath = ScriptPath
        this.ScriptParsed = ScriptParsed
    }

    async write(TaggedString, FunctionTested) {
        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(FunctionTested)}`)
        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(FunctionTested)}`)
        await appendFile("test.js", `${TaggedString}`)
        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
    }

    CheckModuleExports(Scriptparsed) {
        if (typeof Scriptparsed !== "object") {
            throw new TypeError("Scriptparsed should be typeof object!");
        }

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

    async CheckFunctions(Scriptparsed) {
        // Constants
        const RC = await appendFile("test.js", "\n")
        let arr = []
        for (const obj of Scriptparsed.body) {
            if (Reflect.get(obj, "type") === "FunctionDeclaration") {
                if (Reflect.get(obj.body.body[0], "type") === "ReturnStatement") {
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ObjectExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ClassExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnClass(obj.id.name), obj.id.name)
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ArrayExpression") {
                        if (obj.body.body[0].argument.elements.length === 0) {
                            await this.write(TestPartsFunction.avaFunctionReturnArray(obj.id.name), obj.id.name)
                        }
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "NewExpression") {
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Promise") {
                            await this.write(TestPartsFunction.avaFunctionReturnPromise(obj.id.name), obj.id.name)
                        }
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Set") {
                            await this.write(TestPartsFunction.avaFunctionReturnSet(obj.id.name), obj.id.name)
                        }
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Map") {
                            await this.write(TestPartsFunction.avaFunctionReturnMap(obj.id.name), obj.id.name)
                        }
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "WeakMap") {
                            await this.write(TestPartsFunction.avaFunctionReturnWeakMap(obj.id.name), obj.id.name)
                        }
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "Identifier") {
                        await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "Literal") {
                        if (typeof (obj.body.body[0].argument.value) === "string") {
                            await this.write(TestPartsFunction.avaFunctionReturnString(obj.id.name), obj.id.name)
                        }
                        if (typeof (obj.body.body[0].argument.value) === "number" && Reflect.get(obj.body.body[0].argument, "bigint") === undefined) {
                            await this.write(TestPartsFunction.avaFunctionReturnNumber(obj.id.name), obj.id.name)
                        }
                        if (Reflect.get(obj.body.body[0].argument, "bigint") === '"hello"') {
                            await this.write(TestPartsFunction.avaFunctionReturnBigint(obj.id.name), obj.id.name)
                        }
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "CallExpression") {
                        if (obj.body.body[0].argument.callee.object.name === "Object") {
                            await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                        }
                    }
                }
            }
        }
        return arr
    }
}
module.exports = { Algo }
