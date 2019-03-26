// Require NodeJS Dependencies
const { appendFile } = require("fs").promises

// Helpers 
const { TestPartsFunction } = require("./src/Tagged")

class Algo{
    constructor(ScriptPath, ScriptParsed) {
        this.ScriptPath = ScriptPath
        this.ScriptParsed = ScriptParsed
    }

    async write(TaggedString, FunctionTested){
        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(FunctionTested)}`)
        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(FunctionTested)}`)
        await appendFile("test.js", `${TaggedString}`)
        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
    }

    CheckModuleExports(Scriptparsed) {
        if (typeof Scriptparsed !== "object"){
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
            if (obj.type === "FunctionDeclaration") {
                if (obj.body.body[0].type === "ReturnStatement") {
                    if (obj.body.body[0].argument.type === "ObjectExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                    }
                    if (obj.body.body[0].argument.type === "ClassExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnClass(obj.id.name), obj.id.name)
                    }
                    if (obj.body.body[0].argument.type === "ArrayExpression") {
                        if (obj.body.body[0].argument.elements.length === 0){
                            await this.write(TestPartsFunction.avaFunctionReturnArray(obj.id.name), obj.id.name)
                        }
                    }
                    if (obj.body.body[0].argument.type === "NewExpression") {
                        // await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                    }
                    console.log(obj.body.body[0]);
                    if (obj.body.body[0].argument.type === "Identifier") {
                        await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
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
