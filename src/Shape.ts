// Point Class
class Point {
  private _x!: number;
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  private _y!: number;
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  constructor(x: number = 2, y: number = 2) {
    this.x = x;
    this.y = y;
  }
  public toString(): string {
    return `(${this.x},${this.y})`;
  }
}

// Shape Class ****************************
abstract class Shape extends Point {
  private _name!: string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _location!: Point;

  public get location(): Point {
    return this._location;
  }
  public set location(value: Point) {
    this._location = value;
  }

  constructor(name: string = "Shape", location: Point = new Point(0, 0)) {
    super();
    this.name = name;
    this.location = location;
  }
  public toString(): string {
    return `name: ${this.name}, location: ${this.location}`;
  }

  abstract draw(): void;
}

// Rectangle Class *****************************
class Rectangle extends Shape {
  private _width!: number;
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }
  private _height!: number;
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  constructor(
    name: string = "Rectangle",
    location: Point = new Point(),
    width: number = 0,
    height?: any //  height: number = 0
  ) {
    super(name, location);
    this.width = width;
    this.height = height;
  }
  public toString(): string {
    return `${super.toString()}, w: ${this.width}, h: ${this.height}`;
  }

  draw(): void {
    if (typeof this.width === "number" && typeof this.height !== "number") {
      console.log(`${super.toString()}, w: ${this.width}, h: ${this.width}`);
      this.toString();
    } else if (
      typeof this.width !== "number" &&
      typeof this.height === "number"
    ) {
      console.log(`${super.toString()}, w: ${this.height},h: ${this.height}`);
    } else {
      console.log(this.toString());
    }
  }
}

// Ellipse Class **********************************
class Ellipse extends Shape {
  private _a!: number;
  public get a(): number {
    return this._a;
  }
  public set a(value: number) {
    this._a = value;
  }
  private _b!: number;
  public get b(): number {
    return this._b;
  }
  public set b(value: number) {
    this._b = value;
  }

  constructor(
    name: string = "",
    location: Point = new Point(0, 0),
    a: number = 0,
    b?: any
  ) {
    super(name, location);
    this.a = a;
    this.b = b;
  }
  public toString(): string {
    return `${super.toString()}, a: ${this.a}, b: ${this.b}`;
  }

  draw(): void {
    if (typeof this.a === "number" && typeof this.b !== "number") {
      console.log(`${super.toString()}, a: ${this.a}, b: ${this.a}`);

      this.toString();
    } else if (typeof this.a !== "number" && typeof this.b === "number") {
      console.log(`${super.toString()}, a: ${this.b}, b: ${this.b}`);
    } else {
      console.log(this.toString());
    }
  }
}

// Square Class **********************************
class Square extends Rectangle {
  constructor(
    name: string = "Square",
    location: Point = new Point(0, 0),
    side: number = 0
  ) {
    super(name, location);
    this.width = side;
  }
}

// Circle Class *********************************
class Circle extends Ellipse {
  constructor(
    name: string = "Circle",
    location: Point = new Point(0, 0),
    r: number = 0
  ) {
    super(name, location);
    this.a = r;
  }
}

// Shapes Class ********************************
class Shapes {
  private shapes: Map<string, Shape> = new Map();

  public add(s: Shape): Shape | undefined {
    let s1: Shape | undefined;
    s1 = this.shapes.get(s.name);
    this.shapes.set(s.name, s);
    return s1;
  }
  public remove(name: string): Shape | undefined {
    let shape: Shape | undefined;
    shape = this.shapes.get(name);
    this.shapes.delete(name);
    return shape;
  }

  public remove2(p: Point): Shape | undefined {
    let shape: Shape | undefined;
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
  public drawall(): void {
    console.log("********** START **********");
    this.shapes.forEach((s) => s.draw());
    console.log("*********** END ***********");
  }
}

let shapes: Shapes = new Shapes();
shapes.drawall();
shapes.add(new Rectangle("R1", new Point(1, 2), 11, 22));
shapes.drawall();
let n: string = "R2";
let s: Shape | undefined = shapes.remove(n);
console.log(
  `Tried to remove by: ${n}, result: ${
    s != undefined ? s.toString() : "not found"
  }`
);
shapes.drawall();
shapes.add(new Ellipse("E1", new Point(3, 4), 33, 44));
let p: Point = new Point(1, 2);
s = shapes.remove2(p);
console.log(
  `Tried to remove by: ${p.toString()}, result: ${
    s != undefined ? s.toString() : "not found"
  }`
);
shapes.drawall();
shapes.add(new Square("S1", new Point(5, 6), 55));
shapes.add(new Circle("C1", new Point(7, 8), 77));
shapes.drawall();

module.exports = { Point, Shape, Rectangle, Ellipse, Square, Circle, Shapes };
