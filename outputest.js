function func(a) {
    return a
}

function nombre() {
    return 2
}

function string() {
    return "hello"
}

function object() {
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

function obje() {
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

module.exports = {
    func, nombre, string, object,
    Promis, array, classes, obje, isSet,
    isMap, isWeakMap
}
