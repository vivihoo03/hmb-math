
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

    public distance(a: Coordinate, b: Coordinate) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public magnitude(a: Coordinate) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }
}