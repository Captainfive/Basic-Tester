// Require NodeJS Dependencies
const { appendFile } = require("fs").promises

// Helpers 
const { TestPartsFunction } = require("./Tagged")

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
        // Check if the path is of type String
        if (typeof ScriptPath !== "string") {
            throw new TypeError("ScriptPath must be a string");
        }
        // Check that the Script is of type Object
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
        // Check that the Script is of type Object
        if (typeof Scriptparsed !== "object") {
            throw new TypeError("Scriptparsed should be typeof object!");
        }
        // Check each script object to find the module.export
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
            // CLASSIC FUNCTION
            if (Reflect.get(obj, "type") === "FunctionDeclaration" && obj.async === false) {
                // No Return-Statement
                if (obj.body.body[0] === undefined) {
                    await appendFile("test.js", `${TestPartsFunction.avaStartFunction(obj.id.name)}`)
                    await appendFile("test.js", `${TestPartsFunction.avaIsFunction(obj.id.name)}`)
                    await appendFile("test.js", `${TestPartsFunction.avaEND}`)
                }
                if (obj.body.body[0] !== undefined){
                    //  RETURN STATEMENT
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
                        // NEW EXPRESSION
                        if (Reflect.get(obj.body.body[0].argument, "type") === "NewExpression") {
                            // PROMISE
                            if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Promise") {
                                await this.write(TestPartsFunction.avaFunctionReturnPromise(obj.id.name), obj.id.name)
                            }
                            // Error
                            if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Error") {
                                await this.write(TestPartsFunction.avaFunctionReturnError(obj.id.name), obj.id.name)
                            }
                            // Regexp
                            if (Reflect.get(obj.body.body[0].argument.callee, "name") === "RegExp") {
                                await this.write(TestPartsFunction.avaFunctionReturnRegExp(obj.id.name), obj.id.name)
                            }
                            // Date
                            if (Reflect.get(obj.body.body[0].argument.callee, "name") === "Date") {
                                await this.write(TestPartsFunction.avaFunctionReturnDate(obj.id.name), obj.id.name)
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
                            // WeakSet
                            if (Reflect.get(obj.body.body[0].argument.callee, "name") === "WeakSet") {
                                await this.write(TestPartsFunction.avaFunctionReturnWeakSet(obj.id.name), obj.id.name)
                            }
                        }
                        // LITERAL
                        if (Reflect.get(obj.body.body[0].argument, "type") === "Literal") {
                            // String
                            if (typeof (obj.body.body[0].argument.value) === "string") {
                                await this.write(TestPartsFunction.avaFunctionReturnString(obj.id.name), obj.id.name)
                            }
                            //  Number
                            if (typeof (obj.body.body[0].argument.value) === "number" && Reflect.get(obj.body.body[0].argument, "bigint") === undefined) {
                                await this.write(TestPartsFunction.avaFunctionReturnNumber(obj.id.name), obj.id.name)
                            }
                            // Boolean
                            if (typeof (obj.body.body[0].argument.value) === "boolean") {
                                await this.write(TestPartsFunction.avaFunctionReturnBoolean(obj.id.name), obj.id.name)
                            }
                            // Bigint
                            if (typeof (obj.body.body[0].argument.bigint) === "string") {
                                await this.write(TestPartsFunction.avaFunctionReturnBigint(obj.id.name), obj.id.name)
                            }
                            // NULL
                            if (Reflect.get(obj.body.body[0].argument, "value") === null) {
                                await this.write(TestPartsFunction.avaFunctionReturnNull(obj.id.name), obj.id.name)
                            }
                        }
                        // CALLEXPRESSION
                        if (Reflect.get(obj.body.body[0].argument, "type") === "CallExpression") {
                            // PlainObject
                            if (obj.body.body[0].argument.callee.object.name === "Object") {
                                await this.write(TestPartsFunction.avaFunctionReturnPlainObject(obj.id.name), obj.id.name)
                            }
                            // Buffer
                            if (obj.body.body[0].argument.callee.object.name === "Buffer") {
                                await this.write(TestPartsFunction.avaFunctionReturnBuffer(obj.id.name), obj.id.name)
                            }
                        }
                    }
                }
            }
            // ASYNC FUNCTION
            if (Reflect.get(obj, "type") === "FunctionDeclaration" && obj.async === true) {
                await this.write(TestPartsFunction.avaIsAsyncFunction(obj.id.name), obj.id.name)
            }
        }
    }
}
module.exports = { Algo }
