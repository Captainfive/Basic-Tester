function nombre() {
    return 2
}

function string() {
    return "hello"
}

function PlainObject() {
    return Object.create(null)
}

function Promis() {
    return new Promise(function (res, rej) {
        res("hello")
    })
}

function array() {
    return []
}

function classes() {
    return class Rectangle {
        constructor(hauteur, largeur) {
            this.hauteur = hauteur;
            this.largeur = largeur;
        }
    };
}

function object() {
    return {}
}

function isSet() {
    return new Set()
}

function isMap() {
    return new Map()
}

function isWeakMap() {
    return new WeakMap()
}

function isBingint() {
    return 957n
}

module.exports = {
    nombre, string, PlainObject,
    Promis, array, classes, object, isSet,
    isMap, isWeakMap, isBingint
}
