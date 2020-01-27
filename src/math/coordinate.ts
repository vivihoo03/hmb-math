


export class Coordinate {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public clone() {
        return new Coordinate(this.x, this.y)
    }

    public toString() {
        return `(${this.x}, ${this.y})`;
    }

    public equals(a: Coordinate, b: Coordinate) {
        if (a === b) return true;
        return a.x == b.x && a.y == b.y;
    }
}