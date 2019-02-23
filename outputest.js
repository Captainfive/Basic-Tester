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
    return new Promise(function(res, rej) {
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

function obj() {
    return '{}'
}

module.exports = { func, nombre, string, object,
 Promis, array, classes, obj }