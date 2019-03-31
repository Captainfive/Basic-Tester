// Require NodeJS Dependencies
const { appendFile } = require("fs").promises

// Helpers 
const { TestPartsFunction } = require("./src/Tagged")

/**
 * @class Algo
 * @classdesc Ava Basic Auto-tester
 * @property {String} ScriptPath
 * @property {Object} ScriptParsed
 *
 * @author MONTES Irvin <irvin_montes@outlook.fr>
 */
class Algo {
    /**
    * @constructor
    * @param {String=} ScriptParth
    *
    * @throws {TypeError}
    */
    constructor(ScriptPath, ScriptParsed) {
        if (typeof ScriptPath !== "string") {
            throw new TypeError("ScriptPath must be a string");
        }
        if (typeof ScriptParsed !== "object") {
            throw new TypeError("ScriptParsed must be an object");
        }
        this.ScriptPath = ScriptPath
        this.ScriptParsed = ScriptParsed
    }
    /**
   * @async
   * @method write
   * @desc Function that takes in arguments a tagged string and the name of the function test. Return undefined.
   * @memberof Algo#
   * @returns {undefined}
   */
    async write(TaggedString, FunctionTested) {
        await appendFile("test.js", `${TestPartsFunction.avaStartFunction(FunctionTested)}`)
        await appendFile("test.js", `${TestPartsFunction.avaIsFunction(FunctionTested)}`)
        await appendFile("test.js", `${TaggedString}`)
        await appendFile("test.js", `${TestPartsFunction.avaEND}`)
    }
    /**
    * @method CheckModuleExports
    * @param {Object} Scriptparsed
    * @desc Function that verifies the module exports from a file.
    * @memberof Algo#
    * @returns {Array}
    */
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

    /**
   * @async
   * @method CheckFunctions
   * @desc 
   * @memberof Algo#
   * @returns {undefined}
   */
    async CheckFunctions(Scriptparsed) {
        for (const obj of Scriptparsed.body) {
            if (Reflect.get(obj, "type") === "FunctionDeclaration") {
                if (Reflect.get(obj.body.body[0], "type") === "ReturnStatement") {
                    // OBJECT {}
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ObjectExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnObject(obj.id.name), obj.id.name)
                    }
                    // CLASS
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ClassExpression") {
                        await this.write(TestPartsFunction.avaFunctionReturnClass(obj.id.name), obj.id.name)
                    }
                    // ARRAY
                    if (Reflect.get(obj.body.body[0].argument, "type") === "ArrayExpression") {
                        if (obj.body.body[0].argument.elements.length === 0) {
                            await this.write(TestPartsFunction.avaFunctionReturnArray(obj.id.name), obj.id.name)
                        }
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "NewExpression") {
                        // PROMISE
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Promise") {
                            await this.write(TestPartsFunction.avaFunctionReturnPromise(obj.id.name), obj.id.name)
                        }
                        // SET
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Set") {
                            await this.write(TestPartsFunction.avaFunctionReturnSet(obj.id.name), obj.id.name)
                        }
                        // MAP
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Map") {
                            await this.write(TestPartsFunction.avaFunctionReturnMap(obj.id.name), obj.id.name)
                        }
                        // WeakMap
                        if (Reflect.get(obj.body.body[0].argument.callee, "name") === "WeakMap") {
                            await this.write(TestPartsFunction.avaFunctionReturnWeakMap(obj.id.name), obj.id.name)
                        }
                    }
                    if (Reflect.get(obj.body.body[0].argument, "type") === "Literal") {
                        // String
                        if (typeof (obj.body.body[0].argument.value) === "string") {
                            await this.write(TestPartsFunction.avaFunctionReturnString(obj.id.name), obj.id.name)
                        }
                        //  Number
                        if (typeof (obj.body.body[0].argument.value) === "number" && Reflect.get(obj.body.body[0].argument, "bigint") === undefined) {
                            await this.write(TestPartsFunction.avaFunctionReturnNumber(obj.id.name), obj.id.name)
                        }
                        // Bigint
                        if (Reflect.get(obj.body.body[0].argument, "bigint") === '"hello"') {
                            await this.write(TestPartsFunction.avaFunctionReturnBigint(obj.id.name), obj.id.name)
                        }
                    }
                    // Object 2 PlainObject
                    if (Reflect.get(obj.body.body[0].argument, "type") === "CallExpression") {
                        if (obj.body.body[0].argument.callee.object.name === "Object") {
                            await this.write(TestPartsFunction.avaFunctionReturnPlainObject(obj.id.name), obj.id.name)
                        }
                    }
                }
            }
        }
    }
}
module.exports = { Algo }
