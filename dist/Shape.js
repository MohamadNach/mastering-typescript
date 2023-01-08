"use strict";
// Point Class
class Point {
    constructor(x = 2, y = 2) {
        this.x = x;
        this.y = y;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}
// Shape Class ****************************
class Shape extends Point {
    constructor(name = "Shape", location = new Point(0, 0)) {
        super();
        this.name = name;
        this.location = location;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        this._location = value;
    }
    toString() {
        return `name: ${this.name}, location: ${this.location}`;
    }
}
// Rectangle Class *****************************
class Rectangle extends Shape {
    constructor(name = "Rectangle", location = new Point(), width = 0, height //  height: number = 0
    ) {
        super(name, location);
        this.width = width;
        this.height = height;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    toString() {
        return `${super.toString()}, w: ${this.width}, h: ${this.height}`;
    }
    draw() {
        if (typeof this.width === "number" && typeof this.height !== "number") {
            console.log(`${super.toString()}, w: ${this.width}, h: ${this.width}`);
            this.toString();
        }
        else if (typeof this.width !== "number" &&
            typeof this.height === "number") {
            console.log(`${super.toString()}, w: ${this.height},h: ${this.height}`);
        }
        else {
            console.log(this.toString());
        }
    }
}
// Ellipse Class **********************************
class Ellipse extends Shape {
    constructor(name = "", location = new Point(0, 0), a = 0, b) {
        super(name, location);
        this.a = a;
        this.b = b;
    }
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    toString() {
        return `${super.toString()}, a: ${this.a}, b: ${this.b}`;
    }
    draw() {
        if (typeof this.a === "number" && typeof this.b !== "number") {
            console.log(`${super.toString()}, a: ${this.a}, b: ${this.a}`);
            this.toString();
        }
        else if (typeof this.a !== "number" && typeof this.b === "number") {
            console.log(`${super.toString()}, a: ${this.b}, b: ${this.b}`);
        }
        else {
            console.log(this.toString());
        }
    }
}
// Square Class **********************************
class Square extends Rectangle {
    constructor(name = "Square", location = new Point(0, 0), side = 0) {
        super(name, location);
        this.width = side;
    }
}
// Circle Class *********************************
class Circle extends Ellipse {
    constructor(name = "Circle", location = new Point(0, 0), r = 0) {
        super(name, location);
        this.a = r;
    }
}
// Shapes Class ********************************
class Shapes {
    constructor() {
        this.shapes = new Map();
    }
    add(s) {
        let s1;
        s1 = this.shapes.get(s.name);
        this.shapes.set(s.name, s);
        return s1;
    }
    remove(name) {
        let shape;
        shape = this.shapes.get(name);
        this.shapes.delete(name);
        return shape;
    }
    remove2(p) {
        let shape;
        // let myshape: string = p.toString();
        let key;
        let value;
        const iterator = this.shapes.entries();
        for (let entry of iterator) {
            for ([key, value] of entry.entries()) {
                let condition = entry[1].location.x == p.x;
                let condition2 = entry[1].location.y == p.y;
                if (condition && condition2) {
                    shape = this.shapes.get(entry[1].name);
                    this.shapes.delete(entry[1].name);
                    break;
                }
            }
        }
        return shape;
    }
    drawall() {
        console.log("********** START **********");
        this.shapes.forEach((s) => s.draw());
        console.log("*********** END ***********");
    }
}
let shapes = new Shapes();
shapes.drawall();
shapes.add(new Rectangle("R1", new Point(1, 2), 11, 22));
shapes.drawall();
let n = "R2";
let s = shapes.remove(n);
console.log(`Tried to remove by: ${n}, result: ${s != undefined ? s.toString() : "not found"}`);
shapes.drawall();
shapes.add(new Ellipse("E1", new Point(3, 4), 33, 44));
let p = new Point(1, 2);
s = shapes.remove2(p);
console.log(`Tried to remove by: ${p.toString()}, result: ${s != undefined ? s.toString() : "not found"}`);
shapes.drawall();
shapes.add(new Square("S1", new Point(5, 6), 55));
shapes.add(new Circle("C1", new Point(7, 8), 77));
shapes.drawall();
