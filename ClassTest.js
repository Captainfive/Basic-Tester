class Test {
    constructor(ScriptPath, ScriptParsed) {
        this.ScriptPath = ScriptPath
        this.ScriptParsed = ScriptParsed
    }

    // async TestFonction(Scriptparsed) {
    //     for (const obj of Scriptparsed.body) {
    //         if(obj.)
    //     }
    // }

    CheckFunctions(Scriptparsed){
        let arr = []
        for (const obj of Scriptparsed.body) {
            if (obj.type === "FunctionDeclaration") {
                console.log(obj);
                console.log("---\n");
                console.log(obj.body.body[0]);
                console.log("---\n");
                arr.push(obj.id.name)
                arr.push(obj.body.body[0].argument.type)
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
